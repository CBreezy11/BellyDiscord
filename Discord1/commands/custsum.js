const fetch = require('node-fetch');

module.exports = {
    name: 'custsum',
    description: '!custsum',
    async execute(message, args) {
        const searchQuery = args.join(' ');
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                searchTerm: searchQuery,
                sortBy: 'customer_lookup'
            })
        }
        const proxyURL = 'https://cors-anywhere.herokuapp.com/',
            targetURL = 'https://uw9pan87i1.execute-api.us-west-2.amazonaws.com/test'
        await fetch(targetURL, requestOptions)
            .then(resonse => {
                return resonse.json()
            }).then(jsonResponse => {
                const result = {
                    color: 0x0099ff,
                    fields: [
                        {
                            name: 'Name',
                            value: jsonResponse[0].name,
                            inline: false
                        },
                        {
                            name: "Number of Shows Purchased For",
                            value: jsonResponse[0].shows,
                            inline: false
                        },
                        {
                            name: "Number Of Different Phone Numbers",
                            value: jsonResponse[0].phones,
                            inline: false
                        },
                        {
                            name: 'Number Of Different Emails',
                            value: jsonResponse[0].emails,
                            inline: false
                        },
                        {
                            name: 'Number Of Show Where 0 Were Scanned',
                            value: jsonResponse[0].noShows,
                            inline: false
                        }
                    ]
                }
                message.channel.send({ embed: result })
            })
    }
}