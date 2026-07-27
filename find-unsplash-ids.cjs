const https = require('https');

function searchDuckDuckGo(query) {
  return new Promise((resolve) => {
    https.get(`https://html.duckduckgo.com/html/?q=${encodeURIComponent('site:unsplash.com/photos ' + query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Look for unsplash.com/photos/something-ID
        const matches = [...data.matchAll(/unsplash\.com\/photos\/[a-zA-Z0-9-]+-([a-zA-Z0-9_]{11})/g)];
        const ids = [...new Set(matches.map(m => m[1]))];
        resolve(ids.slice(0, 4));
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = ['coorg tea estate', 'ooty nilgiris', 'chikmagalur coffee', 'kerala houseboats backwaters', 'mysore palace'];
  const results = {};
  for (const q of queries) {
    const ids = await searchDuckDuckGo(q);
    results[q] = ids.map(id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&q=80`);
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
