# Video Wallpaper Proxy

A static video proxy for KDE Plasma's "Smart Video Wallpaper reborn" extension, hosted on GitHub Pages. This project provides a simple URL that randomly serves Apple screensaver videos.

## 🌟 Features

- **Random Video Proxy** - Single URL that redirects to random videos
- **Static Hosting** - No server required, works on GitHub Pages
- **KDE Plasma Compatible** - Perfect for Smart Video Wallpaper reborn
- **Web Player** - Beautiful interface for previewing videos in browser
- **No Backend Required** - Pure client-side application

## 🚀 For KDE Plasma Users

After deploying to GitHub Pages, use this URL in your KDE Plasma Smart Video Wallpaper:

```
https://yourusername.github.io/VideoWallpaper_Proxy/video.html
```

Each time KDE requests this URL, it will redirect to a different random video!

## 📦 Hosting on GitHub Pages

### Option 1: Enable GitHub Pages in Repository Settings

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to **Pages** section
4. Under **Source**, select the branch (usually `main` or `master`)
5. Select the root folder `/`
6. Click **Save**
7. Your site will be available at `https://yourusername.github.io/repository-name/`

### Option 2: Using GitHub Actions (Automatic Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 🎬 Video Sources

The application uses publicly available videos from Apple's servers:
- High-quality screensaver videos
- Various scenic locations and subjects
- Optimized for web streaming

## 🛠️ Local Development

Simply open `index.html` in your web browser. No build process or server required!

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a simple HTTP server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## 📱 Usage

1. **Play Random Video** - Click the "Play Random Video" button
2. **Navigate** - Use Next/Previous buttons to browse videos
3. **Auto-Rotate** - Enable to automatically cycle through videos
4. **Direct Selection** - Click any video in the list to play it immediately

## 🔧 Customization

### Adding More Videos

Edit the `videos` array in `index.html`:

```javascript
const videos = [
    'https://your-video-url-1.mov',
    'https://your-video-url-2.mov',
    // Add more videos here
];
```

### Changing Auto-Rotate Interval

Modify the interval in the `toggleAutoPlay()` function:

```javascript
autoRotateInterval = setInterval(() => {
    playNextVideo();
}, 30000); // Change 30000 to desired milliseconds
```

## 📄 Files

- `video.html` - Random video redirect (use this URL for KDE Plasma)
- `index.html` - Web player with controls for browser viewing
- `video-feed-server.js` - Optional local Node.js server (if you prefer running locally)
- `LICENSE` - License information
- `README.md` - This file

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📝 Notes

- **For KDE Plasma**: Use `video.html` - it redirects to a random video each time it's loaded
- **For Browser Viewing**: Use `index.html` - it has a full player with controls
- Videos are streamed directly from Apple's servers
- No video files are stored in this repository
- Requires internet connection to load videos
- Some corporate networks may block video streaming
- KDE Plasma will cache the video, so you'll see the same one until the wallpaper refreshes

## 🎨 Original Project

This is a static version converted from the Node.js proxy server application. The original server is preserved in `video-feed-server.js` for reference.

## 📜 License

See LICENSE file for details.

## 🤝 Contributing

Feel free to open issues or submit pull requests for improvements!
