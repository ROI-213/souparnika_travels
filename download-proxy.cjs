const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'bengaluru');

const images = {
  "nandi-hills.jpg": "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sunrise_at_Nandi_Hills.jpg/800px-Sunrise_at_Nandi_Hills.jpg",
  "wonderla.jpg": "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Wonderla_Amusement_Park_Kochi.jpg/800px-Wonderla_Amusement_Park_Kochi.jpg",
  "visvesvaraya.jpg": "https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Visvesvaraya_Industrial_and_Technological_Museum%2C_Bangalore_%282025%29_02.jpg/800px-Visvesvaraya_Industrial_and_Technological_Museum%2C_Bangalore_%282025%29_02.jpg"
};

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filename).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(path.join(targetDir, filename));
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(url, filename);
      console.log(`Successfully downloaded ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

main();
