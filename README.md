# Video Wallpaper Proxy for KDE Plasma

A Node.js proxy server that provides a single URL endpoint for KDE Plasma's "Smart Video Wallpaper reborn" extension, which randomly serves beautiful Apple screensaver videos.

## 🎯 The Problem & Solution

**Problem**: KDE Plasma's Smart Video Wallpaper needs actual video URLs and doesn't execute JavaScript. GitHub Pages can't do server-side random selection.

**Solution**: Run this Node.js server locally that provides `http://localhost:8080/video-feed.mov` - each request gets a random video!

## 🚀 Quick Start

### 1. Start the Server

```bash
node video-feed-server.js
```

### 2. Configure KDE Plasma Smart Video Wallpaper

Use this URL in the wallpaper settings:
```
http://localhost:8080/video-feed.mov
```

Each time KDE requests this URL, it gets a random video from the pool!

## 🔧 Run as System Service (Auto-start on Boot)

### Install as User Service

```bash
# Create systemd user directory if it doesn't exist
mkdir -p ~/.config/systemd/user

# Copy service file
cp video-wallpaper-proxy.service ~/.config/systemd/user/

# Update the WorkingDirectory path in the service file to match your actual location
nano ~/.config/systemd/user/video-wallpaper-proxy.service

# Enable and start the service
systemctl --user enable video-wallpaper-proxy.service
systemctl --user start video-wallpaper-proxy.service

# Check status
systemctl --user status video-wallpaper-proxy.service
```

### Service Management Commands

```bash
# Start the service
systemctl --user start video-wallpaper-proxy.service

# Stop the service
systemctl --user stop video-wallpaper-proxy.service

# Restart the service
systemctl --user restart video-wallpaper-proxy.service

# Check logs
journalctl --user -u video-wallpaper-proxy.service -f
```

## 🎬 Available Videos

The server rotates through 6 beautiful Apple screensaver videos:
- High-quality screensaver videos
- Various scenic locations and subjects
- Optimized for web streaming

## 🛠️ Local Development

Simply open `index.html` in your web browser. No build process or server required!

```bash
# Option 1: Open directly
open index.html
- Aerial scenes
- Nature landscapes  
- City views
- Ocean scenes

## 🛠️ Customization

### Add More Videos

Edit `video-feed-server.js` and add URLs to the `videos` array:

```javascript
const videos = [
    'https://your-video-url-1.mov',
    'https://your-video-url-2.mov',
    // Add more...
];
```

### Change Port

Edit the `PORT` constant in `video-feed-server.js`:

```javascript
const PORT = 8080; // Change to your preferred port
```

## 📋 Endpoints

- `/video-feed.mov` - Random video proxy (use this for KDE Plasma)
- `/playlist.m3u` - M3U playlist with all videos
- `/` - Web interface with information

## 🧪 Testing

Test in your browser:
```bash
# Start the server
node video-feed-server.js

# Open in browser
http://localhost:8080
```

## 📄 Files

- `video-feed-server.js` - ✅ **Node.js server (required for KDE Plasma)**
- `video-wallpaper-proxy.service` - Systemd service file for auto-start
- `index.html` - Web player with controls for browser viewing
- `video.html` - JavaScript redirect (doesn't work with KDE)
- `playlist.m3u` - Playlist file with all video URLs
- LICENSE - License information
- README.md - This file

## ❗ Why Not GitHub Pages?

**GitHub Pages won't work** for KDE Plasma's video wallpaper because:
- Static hosting can't execute server-side code
- JavaScript redirects (`video.html`) don't work with KDE's video player
- You need a real server to randomly select and serve videos

The `index.html` and `video.html` files are included for browser viewing only.

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port is already in use
lsof -i :8080

# Kill process using the port
kill -9 <PID>
```

### KDE Plasma can't connect
- Make sure the server is running: `systemctl --user status video-wallpaper-proxy.service`
- Test the URL in a browser first: `http://localhost:8080/video-feed.mov`
- Verify Node.js is installed: `node --version`

### Videos won't load
- Check your internet connection
- Verify Apple's CDN is accessible
- Check server logs: `journalctl --user -u video-wallpaper-proxy.service`

## 📜 License

See LICENSE file for details.
