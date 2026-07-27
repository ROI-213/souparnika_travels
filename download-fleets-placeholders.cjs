const https = require('https');
const fs = require('fs');
const path = require('path');

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
    { id: 'b3YsdjBe-Zw', dest: 'public/images/fleets/cars/suv.webp' },
    { id: 'pqK6x_cFozE', dest: 'public/images/fleets/cars/innova.webp' },
    { id: '929CnAz6CcA', dest: 'public/images/fleets/cars/ertiga.webp' },
    
    { id: 'qWrwM6hHmkQ', dest: 'public/images/fleets/tempo/tempo-12.webp' },
    { id: 'aUsPiJNp6EY', dest: 'public/images/fleets/tempo/tempo-17.webp' },
    { id: 'ToY9Tts1JeM', dest: 'public/images/fleets/tempo/tempo-luxury.webp' },
    
    { id: 'qWrwM6hHmkQ', dest: 'public/images/fleets/buses/mini-bus.webp' },
    { id: 'aUsPiJNp6EY', dest: 'public/images/fleets/buses/bus-21.webp' },
    { id: 'ToY9Tts1JeM', dest: 'public/images/fleets/buses/bus-32.webp' },
    { id: 'qWrwM6hHmkQ', dest: 'public/images/fleets/buses/bus-50.webp' },
  ];

  for (const img of images) {
    const url = `https://unsplash.com/photos/${img.id}/download?w=800`;
    console.log(`Downloading ${img.dest} from ${url}`);
    try {
      await downloadImage(url, path.join(__dirname, img.dest));
    } catch (e) {
      console.error(`Error for ${img.dest}:`, e.message);
    }
  }
  console.log('All downloads complete!');
}

run();
