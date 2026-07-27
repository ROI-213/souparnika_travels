const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUnsplashUrls(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const matches = [...data.matchAll(/"(https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+[^"]+)"/g)];
        const urls = matches.map(m => m[1]).filter(url => url.includes('w='));
        resolve(urls.slice(0, 5));
      });
    }).on('error', reject);
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  const images = [
    { query: 'white suv car', dest: 'public/images/fleets/cars/suv.webp' },
    { query: 'white minivan', dest: 'public/images/fleets/cars/innova.webp' },
    { query: 'white mpv car', dest: 'public/images/fleets/cars/ertiga.webp' }
  ];

  for (const img of images) {
    console.log(`Fetching URL for: ${img.query}`);
    try {
      const urls = await fetchUnsplashUrls(img.query);
      if (urls.length > 0) {
        let finalUrl = urls[0].split('?')[0] + '?w=800&q=80';
        console.log(`Downloading ${finalUrl} to ${img.dest}`);
        await downloadImage(finalUrl, path.join(__dirname, img.dest));
      } else {
        console.log(`No images found for ${img.query}`);
      }
    } catch (e) {
      console.error(`Error for ${img.query}:`, e.message);
    }
  }
  console.log('All downloads complete!');
}

run();
