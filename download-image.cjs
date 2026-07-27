const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Mysore_Palace_-_Karnataka.jpg';
const dest = path.join(__dirname, 'public', 'images', 'hero', 'mysore-palace-hero.webp');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
  }
};

https.get(url, options, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download: ${res.statusCode}`);
    process.exit(1);
  }
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Download complete!');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
