const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'bengaluru');

const images = {
  "nandi-hills.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/19/Sunrise_at_Nandi_Hills.jpg",
  "wonderla.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Wonderla_Amusement_Park_Kochi.jpg",
  "visvesvaraya.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Visvesvaraya_Industrial_and_Technological_Museum%2C_Bangalore_%282025%29_02.jpg"
};

async function download(url, filename) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(path.join(targetDir, filename), buffer);
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
