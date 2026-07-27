const https = require('https');

const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&generator=search&gsrsearch=Kerala%20Backwaters%20Houseboat&gsrlimit=10&piprop=original';

https.get(url, { headers: { 'User-Agent': 'TravelAppBot/1.0 (test@example.com)' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const pages = parsed.query?.pages || {};
      const images = Object.values(pages)
        .filter(p => p.original && p.original.source)
        .map(p => p.original.source)
        .filter(src => !src.endsWith('.svg') && !src.endsWith('.gif'));
      console.log(JSON.stringify(images, null, 2));
    } catch (e) {
      console.error(e);
    }
  });
});
