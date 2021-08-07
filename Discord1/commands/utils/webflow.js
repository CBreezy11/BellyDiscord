var https = require('https');

const sendToSite = (data) => {
    webmsg = '';
    for (const zip in data) {
        if (data[zip].tix != undefined) {
            webmsg += `${zip.toUpperCase()}        Tickets: ${data[zip].tix}        Percent: ${data[zip].percent}<br>`
        }
    }

    var payload = JSON.stringify({
        fields: {
            "name": `${data.show}    ${data.date}`,
            "report1": webmsg,
            "slug": data.show,
            "_archived": false,
            "_draft": false
        }
    });


    var options = {
        protocol: 'https:',
        hostname: 'api.webflow.com',
        method: 'POST',
        path: '/collections/60c779d77b83c83e4474c603/items?live=true',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length,
            'Authorization': 'Bearer 6d58dbbb2afe45931aafecf73ee3573f0e740953ef36d76397c5cfec9d5eb9f5',
            'Accept-Version': '1.0.0',
        },
    };


    var req = https.request(options, (res) => {
        var data = [];
        res.on('data', d => {
            data.push(d)
        });
        res.on('end', () => {
            var result = JSON.parse(data);
            console.log(result)
        });
        req.on('error', e => {
            console.log(e)
        });
    });
    req.write(payload)
    req.end();
};

module.exports = sendToSite;