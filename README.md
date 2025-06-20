# 🛡️ PhishPal – Your Friendly Anti-Phishing Assistant

**PhishPal** is a lightweight Chrome extension that protects users from phishing attacks in real-time by scanning links **on hover** using the [VirusTotal API](https://www.virustotal.com).

## 🔍 Features
- Scans links the moment you hover over them
- Displays risk with 🟢🟡🔴 icons beside links
- Tooltip shows detailed VirusTotal scan stats
- Caches results locally for performance
- Uses the official VirusTotal URL reputation API

## 🚀 How It Works
1. When you hover over a link, PhishPal checks its reputation using VirusTotal.
2. A visual icon appears showing the link’s risk level.
3. Hovering over the icon reveals more detail.
4. Dangerous links (flagged by any engine) are marked 🔴.

## 🧠 Why PhishPal?
Phishing emails and websites are one click away. PhishPal helps prevent bad decisions before they're made.

## 📦 Installation (Developer Mode)
1. Download this repo.
2. Go to `chrome://extensions`
3. Enable **Developer Mode**
4. Click **Load Unpacked** → Select the folder
5. Add your [VirusTotal API key](https://www.virustotal.com/gui/join-us) to `background.js`

## 🧪 Warning
This is an MVP. Use responsibly and don’t click flagged links.

## 📄 License
MIT
