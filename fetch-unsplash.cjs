const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'bengaluru');

const images = {
  "wonderla.jpg": "https://images.unsplash.com/photo-1595166297316-db766e4a66bb?auto=format&fit=crop&w=800&q=80",
  "visvesvaraya.jpg": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
};

async function download(url, filename) {
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status}`);
  }
  
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(path.join(targetDir, filename), Buffer.from(arrayBuffer));
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
