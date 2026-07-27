const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'bengaluru');

async function download() {
  const url = 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80'; // Guaranteed to work (Rollercoaster)
  const filename = 'wonderla.jpg';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  const arrayBuffer = await res.arrayBuffer();
  fs.writeFileSync(path.join(targetDir, filename), Buffer.from(arrayBuffer));
  console.log(`Successfully downloaded ${filename}`);
}

download().catch(console.error);
