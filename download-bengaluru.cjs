const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  "iskcon.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/86/ISKCON_Temple_Bangalore_View.jpg",
  "bannerghatta.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/da/Lion_at_Bannerghatta_National_Park.jpg",
  "nandi-hills.jpg": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Nandi_Hills_Sunrise.jpg",
  "wonderla.jpg": "https://images.unsplash.com/photo-1513343049759-450f61dcc78f?auto=format&fit=crop&w=800&q=80",
  "visvesvaraya.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/9f/Visvesvaraya_Industrial_and_Technological_Museum_Bangalore.jpg",
  "planetarium.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/af/Jawaharlal_Nehru_Planetarium%2C_Bangalore.jpg",
  "ulsoor.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ulsoor_Lake_Bangalore.jpg",
  "sankey.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/52/Sankey_Tank.jpg",
  "commercial-st.jpg": "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=800&q=80",
  "church-st.jpg": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
  "ub-city.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/91/UB_City_Mall.jpg",
  "bull-temple.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bull_Temple%2C_Bangalore.jpg",
  "tipu-palace.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/07/Tipu_Sultan%27s_Summer_Palace.jpg",
  "ngma.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/ec/National_Gallery_of_Modern_Art%2C_Bangalore.jpg",
  "freedom-park.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Freedom_Park%2C_Bangalore_05.jpg",
  "lumbini.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Lumbini_Gardens_Nagawara_Lake.jpg"
};

const targetDir = path.join(__dirname, 'public', 'images', 'bengaluru');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // handle redirect
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
    console.log(`Downloading ${filename}...`);
    try {
      await download(url, filename);
      console.log(`Successfully downloaded ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
}

main();
