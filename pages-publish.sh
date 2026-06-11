#!/usr/bin/env bash
# Manual GitHub Pages publish — run when you want to update the live demo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo "Building production bundle…"
npm run build

REMOTE="${PAGES_REMOTE:-origin}"
BRANCH="gh-pages"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cp -r dist/. "$WORK/"
cd "$WORK"

git init -q
git checkout -q -b "$BRANCH"
git add -A
git commit -q -m "Publish static demo app (manual)"

git remote add publish "$(git -C "$ROOT" remote get-url "$REMOTE")"
echo "Pushing to $REMOTE/$BRANCH …"
git push -f publish "HEAD:$BRANCH"

echo ""
echo "Done. GitHub → Settings → Pages → Source = gh-pages branch, / (root)"
echo "Live URL: https://akshayatharun-cmyk.github.io/react_demo_app/"
