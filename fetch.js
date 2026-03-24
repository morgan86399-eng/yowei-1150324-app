const https = require('https');
https.get('https://taoyuanyangxintuina.webnode.tw/', (res) => {
  let data = '';
  res.on('data', c => data+=c);
  res.on('end', () => {
    let m;
    const re = /<img[^>]+src="([^"]+)"/g;
    while(m = re.exec(data)) console.log(m[1]);
  });
});