#!/bin/bash
# Starfall Frontier — one-click local launcher for macOS.
#
# Double-click this file in Finder to start the game on your Mac. On the first
# run it installs what it needs; after that it just starts. A browser tab opens
# automatically. Nothing is deployed anywhere — this runs entirely on your Mac.
#
# Best used when you got the code via `git clone` (a Download-ZIP copy loses the
# runnable flag; use the Terminal `npm start` way in LOCAL_DEV.md instead).
# If macOS blocks it ("unidentified developer"): macOS 15+ → System Settings →
# Privacy & Security → "Open Anyway"; older macOS → right-click → Open → Open.

cd "$(dirname "$0")" || exit 1

echo "── Starfall Frontier — local dev ─────────────────────────"

# 1. Node.js must be installed.
if ! command -v node >/dev/null 2>&1; then
  echo
  echo "  Node.js is not installed yet."
  echo "  1. Go to https://nodejs.org"
  echo "  2. Download the LTS version (the big green button) and install it."
  echo "  3. Double-click this run.command file again."
  echo
  read -r -p "Press Return to close…" _
  exit 1
fi
echo "  Node $(node -v) found."

# 2. Install dependencies on the first run only.
if [ ! -d node_modules ]; then
  echo "  First run: installing dependencies (about a minute)…"
  if ! npm install; then
    echo
    echo "  Install failed. Check your internet connection and try again."
    read -r -p "Press Return to close…" _
    exit 1
  fi
fi

echo
echo "  Starting the game…  your browser opens automatically once it's ready."
echo "  To also play on your iPhone: on the same Wi-Fi, open a 'Network'"
echo "  address printed below (usually http://192.168.x.x:5173)."
echo "  Press Control-C in this window to stop the game."
echo "──────────────────────────────────────────────────────────"
echo

# `npm start` = `vite --open`: Vite opens the browser on the actual port it
# bound (e.g. 5174 if 5173 was taken), and only after the server is ready —
# no guessing the URL or racing a fixed timer.
npm start
