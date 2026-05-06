import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localSourceRoot = path.join(repoRoot, ".agents", "skills");
const localSourceLockPath = path.join(repoRoot, "skills-lock.json");

function usage(exitCode = 0) {
  console.log(`Usage:
  ./skills.sh list [--repo <owner/repo|url>]
  ./skills.sh add [--repo <owner/repo|url>] <skill...> [--target <project-dir>]
  ./skills.sh sync [--repo <owner/repo|url>] [--target <project-dir>]

Examples:
  ./skills.sh add grill-me
  ./skills.sh add --repo Hector-Ha/skills grill-me
  ./skills.sh add --repo https://github.com/Hector-Ha/skills grill-me tdd --target ../my-app
  ./skills.sh sync --repo Hector-Ha/skills --target ../my-app
`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = [...argv];
  const result = {
    command: "add",
    repo: null,
    ref: null,
    target: process.cwd(),
    skills: [],
  };

  const knownCommands = new Set(["add", "install", "list", "sync", "help"]);
  if (args.length > 0 && knownCommands.has(args[0])) {
    result.command = args.shift();
  }

  if (args.length > 0 && looksLikeRepoSpec(args[0])) {
    result.repo = args.shift();
  }

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--repo") {
      const value = args.shift();
      if (!value) throw new Error("--repo requires a repo spec");
      result.repo = value;
      continue;
    }
    if (arg === "--ref") {
      const value = args.shift();
      if (!value) throw new Error("--ref requires a ref");
      result.ref = value;
      continue;
    }
    if (arg === "--target") {
      const value = args.shift();
      if (!value) throw new Error("--target requires a path");
      result.target = path.resolve(value);
      continue;
    }
    if (arg === "--help" || arg === "-h") usage(0);
    if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}`);
    result.skills.push(arg);
  }

  return result;
}

function looksLikeRepoSpec(value) {
  return (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("git@") ||
    /^[\w.-]+\/[\w.-]+$/.test(value)
  );
}

function normalizeRepoSpec(repoSpec) {
  if (repoSpec.startsWith("http://") || repoSpec.startsWith("https://") || repoSpec.startsWith("git@")) {
    return repoSpec;
  }
  return `https://github.com/${repoSpec}.git`;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function loadLocalSourceLock() {
  if (!existsSync(localSourceLockPath)) {
    return { version: 1, skills: {} };
  }
  return readJson(localSourceLockPath);
}

function walkSkillDirs(sourceRoot) {
  const skills = [];

  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const skillDir = path.join(dir, entry.name);
      const skillMd = path.join(skillDir, "SKILL.md");
      if (existsSync(skillMd)) {
        const relativePath = path.relative(sourceRoot, skillDir);
        const skillName = entry.name;
        skills.push({ name: skillName, dir: skillDir, relativePath });
        continue;
      }
      walk(skillDir);
    }
  }

  walk(sourceRoot);
  return skills;
}

function discoverLocalSource() {
  return {
    sourceId: "local-repo",
    sourceType: "local",
    sourceRoot,
    lock: loadLocalSourceLock(),
    cleanup: null,
  };
}

function detectRemoteSourceRoot(cloneRoot) {
  const skillsDir = path.join(cloneRoot, "skills");
  if (existsSync(skillsDir) && walkSkillDirs(skillsDir).length > 0) {
    return skillsDir;
  }
  if (walkSkillDirs(cloneRoot).length > 0) {
    return cloneRoot;
  }
  throw new Error("No SKILL.md files found in cloned repository");
}

function discoverRemoteSource(repoSpec, ref) {
  const cloneRoot = mkdtempSync(path.join(os.tmpdir(), "skills-repo-"));
  const repoUrl = normalizeRepoSpec(repoSpec);
  const cloneArgs = ["clone", "--depth", "1"];
  if (ref) {
    cloneArgs.push("--branch", ref);
  }
  cloneArgs.push(repoUrl, cloneRoot);

  try {
    execFileSync("git", cloneArgs, { stdio: "ignore" });
    const sourceRoot = detectRemoteSourceRoot(cloneRoot);
    return {
      sourceId: repoSpec,
      sourceType: "github",
      sourceRoot,
      lock: { version: 1, skills: {} },
      cleanup: () => rmSync(cloneRoot, { recursive: true, force: true }),
    };
  } catch (error) {
    rmSync(cloneRoot, { recursive: true, force: true });
    throw new Error(`Failed to clone ${repoSpec}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function discoverSource(repoSpec, ref) {
  if (!repoSpec) return discoverLocalSource();
  return discoverRemoteSource(repoSpec, ref);
}

function hashDirectory(dir) {
  const hash = crypto.createHash("sha256");

  function walk(currentDir) {
    const entries = readdirSync(currentDir, { withFileTypes: true }).sort((a, b) =>
      a.name.localeCompare(b.name, "en"),
    );

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const relativePath = path.relative(dir, fullPath).replaceAll(path.sep, "/");
      if (entry.isDirectory()) {
        hash.update(`dir:${relativePath}\n`);
        walk(fullPath);
        continue;
      }
      if (entry.isFile()) {
        hash.update(`file:${relativePath}\n`);
        hash.update(readFileSync(fullPath));
      }
    }
  }

  walk(dir);
  return hash.digest("hex");
}

function buildSourceIndex(sourceRoot) {
  const entries = walkSkillDirs(sourceRoot);
  const index = new Map();
  const duplicates = new Map();

  for (const entry of entries) {
    if (index.has(entry.name)) {
      const existing = duplicates.get(entry.name) ?? [index.get(entry.name)];
      existing.push(entry);
      duplicates.set(entry.name, existing);
      index.set(entry.name, null);
      continue;
    }
    index.set(entry.name, entry);
  }

  return { entries, index, duplicates };
}

function installSkill(entry, sourceContext, targetRoot, targetLock) {
  const targetSkillDir = path.join(targetRoot, ".agents", "skills", entry.relativePath);
  mkdirSync(path.dirname(targetSkillDir), { recursive: true });
  cpSync(entry.dir, targetSkillDir, { recursive: true, force: true });

  const existing = sourceContext.lock.skills?.[entry.name] ?? {};
  targetLock.skills[entry.name] = {
    ...existing,
    source: existing.source ?? sourceContext.sourceId,
    sourceType: existing.sourceType ?? sourceContext.sourceType,
    skillPath: path.posix.join(".agents", "skills", entry.relativePath, "SKILL.md"),
    computedHash: existing.computedHash ?? hashDirectory(entry.dir),
  };
}

function pickSkillEntries(selectedNames, sourceIndex) {
  const selected = [];
  const missing = [];

  for (const skillName of selectedNames) {
    const entry = sourceIndex.index.get(skillName);
    if (!entry) {
      if (sourceIndex.duplicates.has(skillName)) {
        const choices = sourceIndex.duplicates.get(skillName).map((item) => item.relativePath).join(", ");
        throw new Error(`Ambiguous skill name "${skillName}". Use a unique path: ${choices}`);
      }
      missing.push(skillName);
      continue;
    }
    selected.push(entry);
  }

  if (missing.length > 0) {
    throw new Error(`Unknown skill(s): ${missing.join(", ")}`);
  }

  return selected;
}

function main() {
  const { command, repo, ref, target, skills } = parseArgs(process.argv.slice(2));
  if (command === "help") usage(0);

  const sourceContext = discoverSource(repo, ref);
  try {
    const sourceIndex = buildSourceIndex(sourceContext.sourceRoot);

    if (command === "list") {
      for (const entry of sourceIndex.entries.sort((a, b) => a.relativePath.localeCompare(b.relativePath, "en"))) {
        console.log(entry.relativePath);
      }
      return;
    }

    const selectedNames = command === "sync" ? sourceIndex.entries.map((entry) => entry.name) : skills;
    if (selectedNames.length === 0) usage(1);

    const selectedEntries = pickSkillEntries(selectedNames, sourceIndex);

    const targetLockPath = path.join(target, "skills-lock.json");
    const targetLock = existsSync(targetLockPath) ? readJson(targetLockPath) : { version: 1, skills: {} };
    targetLock.skills = targetLock.skills ?? {};

    mkdirSync(target, { recursive: true });
    for (const entry of selectedEntries) {
      installSkill(entry, sourceContext, target, targetLock);
      console.log(`installed ${entry.relativePath}`);
    }

    writeFileSync(targetLockPath, `${JSON.stringify(targetLock, null, 2)}\n`);
  } finally {
    sourceContext.cleanup?.();
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
