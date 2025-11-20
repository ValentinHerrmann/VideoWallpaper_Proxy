const http = require('http');
const https = require('https');
const url = require('url');

// Allow self-signed certificates (for development)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const videos = [
    'http://sylvan.apple.com/Videos/comp_A015_C018_0128ZS_v03_SDR_PS_FINAL_20180709__SDR_2K_AVC.mov',
    'http://sylvan.apple.com/Videos/comp_A006_C003_1219EE_CC_v01_SDR_PS_FINAL_20180709_SDR_2K_AVC.mov'
];

const PORT = 8080;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/video-feed.mov') {
        // Pick a random video each time
        const randomIndex = Math.floor(Math.random() * videos.length);
        const videoUrl = videos[randomIndex];
        
        console.log(`Serving random video ${randomIndex + 1}: ${videoUrl}`);
        
        // Proxy the video directly
        http.get(videoUrl, (videoRes) => {
            res.writeHead(videoRes.statusCode, {
                'Content-Type': 'video/quicktime',
                'Content-Length': videoRes.headers['content-length'],
                'Accept-Ranges': videoRes.headers['accept-ranges'] || 'bytes',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            });
            
            videoRes.pipe(res);
        }).on('error', (err) => {
            console.error('Error streaming video:', err);
            res.writeHead(500);
            res.end('Error streaming video');
        });
        
    } else if (parsedUrl.pathname === '/playlist.m3u8' || parsedUrl.pathname === '/playlist.m3u') {
        // Serve M3U playlist
        res.writeHead(200, { 'Content-Type': 'application/x-mpegURL' });
        const playlist = videos.join('\n');
        res.end(playlist);
        
    } else if (parsedUrl.pathname === '/') {
        // Serve a simple info page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>Video Feed Server</title></head>
            <body style="font-family: sans-serif; padding: 40px;">
                <h1>Video Feed Server</h1>
                <p>Video feed URL: <code>http://localhost:${PORT}/video-feed.mov</code></p>
                <p>Playlist URL: <code>http://localhost:${PORT}/playlist.m3u8</code></p>
                <p>Each request randomly serves one of ${videos.length} videos</p>
                <h3>Test the feed:</h3>
                <video controls width="800" src="/video-feed.mov">
                    Your browser does not support the video tag.
                </video>
                <h3>Direct video URLs (try these if proxy doesn't work):</h3>
                <ol>
                    ${videos.map(v => `<li><code>${v}</code></li>`).join('')}
                </ol>
            </body>
            </html>
        `);
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(PORT, () => {
    console.log(`Video feed server running on http://localhost:${PORT}`);
    console.log(`Video feed URL: http://localhost:${PORT}/video-feed.mov`);
    console.log(`Web interface: http://localhost:${PORT}`);
});
