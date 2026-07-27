const https = require('https');

function fetchUnsplashIds(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, (res) => {
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

async function run() {
  const queries = ['suv city', 'airport airplane', 'mountain road car', 'business man car', 'indian family travel', 'group friends travel', 'wedding car', 'scenic map travel'];
  for (const q of queries) {
    const urls = await fetchUnsplashIds(q);
    console.log(`\nQuery: ${q}`);
    console.log(urls[0] || 'none');
  }
}

run();
