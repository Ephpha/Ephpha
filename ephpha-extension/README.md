# Ephpha.ai Chrome Extension

## Install locally for testing

1. Run `npm install sharp && node generate-icons-simple.js` to generate icon PNGs
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle, top right)
4. Click **Load unpacked**
5. Select the `ephpha-extension/` folder
6. The Ephpha envelope icon appears in your Chrome toolbar
7. Click it on any tab — Ephpha opens in the Chrome Side Panel

## What it does

Opens the full Ephpha.ai web app in Chrome's native Side Panel.
Works on Gmail, Outlook Web, LinkedIn, or any page where you're writing emails.
A small header bar shows the Ephpha brand and an ↗ button to open in a full tab.

## Publishing to Chrome Web Store

1. Zip the `ephpha-extension/` folder contents (not the folder itself)
2. Go to https://chrome.google.com/webstore/devconsole
3. Pay the one-time $5 developer fee if not already registered
4. Upload the zip, fill in store listing, submit for review (1–3 business days)
