const https = require('https');

const pages = [
  'Nandi_Hills,_India',
  'Wonderla',
  'Visvesvaraya_Industrial_and_Technological_Museum'
];

pages.forEach(page => {
  https.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${page}`, {
    headers: { 'User-Agent': 'AntigravityAgent/1.0 (test@example.com)' }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        console.log(`${page}: ${json.thumbnail ? json.thumbnail.source : 'No thumbnail found'}`);
      } catch (e) {
        console.error(e);
      }
    });
  });
});
