param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$RemainingArgs
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
& bun "$scriptDir\scripts\skills.mjs" @RemainingArgs
exit $LASTEXITCODE
