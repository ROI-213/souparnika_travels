const https = require('https');

const destinations = [
  { name: "Coorg", query: "Kodagu district scenery" },
  { name: "Ooty", query: "Ooty scenery" },
  { name: "Chikmagalur", query: "Chikmagalur scenery" },
  { name: "Kerala Backwaters", query: "Kerala Backwaters" },
  { name: "Mysore", query: "Mysore Palace" },
  { name: "Tirupati", query: "Tirumala temple" },
];

async function fetchImages(query) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&piprop=original`;
    https.get(url, { headers: { 'User-Agent': 'TravelAppBot/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query?.pages || {};
          const images = Object.values(pages)
            .filter(p => p.original && p.original.source)
            .map(p => p.original.source)
            .filter(src => !src.endsWith('.svg') && !src.endsWith('.gif'))
            .slice(0, 4);
          resolve(images);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function main() {
  const results = [];
  for (const dest of destinations) {
    const images = await fetchImages(dest.query);
    results.push({
      name: dest.name,
      images
    });
  }
  console.log(JSON.stringify(results, null, 2));
}

main();
