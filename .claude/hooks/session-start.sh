#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "Session start hook running..."

# Persist project root to environment
echo "export PROJECT_ROOT=\"${CLAUDE_PROJECT_DIR:-$(pwd)}\"" >> "${CLAUDE_ENV_FILE:-/dev/null}"

echo "Session start hook complete."
