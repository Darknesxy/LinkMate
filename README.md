# LinkMate — All-in-One Video Downloader (UI/UX + Fullstack)

A modern, high-performance web application to download videos and audio from YouTube, Instagram, Facebook, TikTok, Twitter(X), and 100+ other platforms, crafted faithfully according to your design specifications.

---

## 🎨 UI/UX Design Implementation Highlights

- **Day & Night Themes**: Toggle between a midnight cyber neon dark mode (`#07090e`) and a crisp, modern light mode (`#f8fafc`).
- **Brand Identity**: **LinkMate** with a floating gradient play emblem.
- **Hero Banner**:
  - `⚡ Fast • Unlimited • High Quality` pill badge with pulse animation.
  - Headline: **Download Videos Your Way** (with vibrant cyan-to-purple gradient text).
  - Floating 3D translucent glass tiles (Play badge, Blue glowing download tile, 4K UHD badge, Music note tile).
- **Supported Platforms Quick Bar**:
  - YouTube (Videos & Shorts)
  - Instagram (Reels & Videos)
  - Facebook (Videos)
  - TikTok (Videos)
  - Twitter(X) (Videos)
  - More Platforms (...)
- **Core Downloader Card**:
  - Sleek input field with clipboard paste helper & clear (`✕`) button.
  - 3 Format selector tabs:
    - 🎥 **Video + Audio** (`MP4 with sound`)
    - 🎵 **Audio Only** (`MP3 / M4A`)
    - 🔕 **Video Only** (`MP4 no sound`)
  - Resolution selector pills: `Auto`, `144p`, `360p`, `480p`, `720p HD`, `1080p HD`, `2K`, `4K`.
  - Expandable **Advanced Settings**: Subtitles (English/Hindi/All), Audio Bitrate (up to 320 kbps), Video Codec (H.264/VP9/AV1).
- **Preview & Download Card**:
  - Loads real video metadata (Title, Duration, View count, Channel/Source, Thumbnail).
  - Built-in In-Browser Video Player to preview streams before saving.
  - Formats list: MP4 (Video + Audio), MP3 (Audio Only), MP4 (Video Only) with file sizes and one-click download buttons.
  - Confetti celebration upon download click.
- **4 Feature Cards**:
  - ⚡ Super Fast (Get your videos in seconds.)
  - 💎 High Quality (Up to 4K resolution support.)
  - 🛡️ Safe & Secure (No login required. Your privacy matters.)
  - 📱 All Devices (Works on mobile, tablet and PC.)
- **How It Works? (3 Simple Steps)**:
  - 1. Paste Link
  - 2. Choose Format
  - 3. Download
- **Trust & Benefits Bar**:
  - 🎁 100% Free
  - ♾️ Unlimited Downloads
  - 🚀 Multi-Platform
  - ⭐ Trusted by Millions
- **Works on All Devices Showcase**:
  - Interactive multi-screen mockup showing Desktop, Tablet, and Mobile layouts.
  - Badges for Android, iOS, Windows, macOS.
- **Responsive Navigation**:
  - Sticky glassmorphic navbar with Day/Night Theme toggle, Login, and Sign Up with persistent authentication.
  - Dedicated mobile bottom navigation bar (`Home`, `Tools`, `Downloads`, `More`) with active indicator and badge.

---

## ⚡ Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend**: Python FastAPI, Uvicorn, yt-dlp, FFmpeg (via imageio-ffmpeg).
- **Architecture**: Single unified server serving both the compiled frontend and the REST API.

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Darknesxy/LinkMate.git
cd LinkMate
```

### 2. Install Dependencies
```bash
# Install Python backend dependencies
pip install -r requirements.txt

# Install Frontend dependencies
cd frontend
npm install
npm run build
cd ..
```

### 3. Run the App
**On Windows:**
Double-click `run.bat` or run:
```cmd
.\run.bat
```

**Or start manually:**
```bash
python -m uvicorn backend.server:app --host 0.0.0.0 --port 8000
```
Open **https://darknesxy.github.io/LinkMate/** in your browser!

---

## 👨‍💻 Developer & Author

**Subojit Sarkar**
- **GitHub**: [@Darknesxy](https://github.com/Darknesxy)
- **LinkedIn**: [Subojit Sarkar](https://www.linkedin.com/in/subojit-sarkar-a0b212397?utm_source=share_via&utm_content=profile&utm_medium=member_android)
- **Instagram**: [@sxbojit](https://www.instagram.com/sxbojit?xtok=anc0dm5iMHB1bXV6)

---

## 📄 License
This project is open-source and intended for educational and personal use under the MIT License.
