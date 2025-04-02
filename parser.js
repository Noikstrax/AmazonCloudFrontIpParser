'use strict';

async function getIPsAmazon() {
  const response = await fetch('https://ip-ranges.amazonaws.com/ip-ranges.json');
  return response.json();
}

(async () => {
  try {
    const jsonIPsAmazon = await getIPsAmazon();
    console.log(jsonIPsAmazon);
    console.log('test');

    const ipsCloudFront = [];
    if (jsonIPsAmazon?.prefixes?.length > 0) { // проверка на существование и длину
      const ipPrefixes = jsonIPsAmazon.prefixes;
      for (const ip of ipPrefixes) {
        if (ip.service === 'CLOUDFRONT') {
          ipsCloudFront.push(ip.ip_prefix); // исправлено название переменной
        }
      }
    }

    console.log(ipsCloudFront); // теперь выведет список IP-префиксов CloudFront
    document.body.innerHTML = `<pre>${ipsCloudFront.join('\n')}</pre>`;
  } catch (error) {
    console.error('Error:', error);
  }
})();