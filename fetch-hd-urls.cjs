const https = require('https');

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
        const urls = matches.map(m => m[1].split('?')[0] + '?w=800&q=80').filter((v, i, a) => a.indexOf(v) === i);
        resolve(urls.slice(0, 4));
      });
    }).on('error', reject);
  });
}

async function run() {
  const queries = [
    { name: 'Coorg', q: 'coorg india' },
    { name: 'Ooty', q: 'ooty' },
    { name: 'Chikmagalur', q: 'chikmagalur' },
    { name: 'Kerala Backwaters', q: 'kerala backwaters' },
    { name: 'Mysore', q: 'mysore palace' }
  ];

  const results = {};
  for (const item of queries) {
    const urls = await fetchUnsplashUrls(item.q);
    results[item.name] = urls;
  }
  
  console.log(JSON.stringify(results, null, 2));
}

run();
