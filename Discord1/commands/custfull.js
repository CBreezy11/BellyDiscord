const fetch = require('node-fetch');

module.exports = {
    name: 'custfull',
    description: '!custfull',
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
                for (const show of jsonResponse) {
                    show.show.map(entry => {
                        const result = {
                            color: 0x0099ff,
                            fields: [
                                {
                                    name: entry.name,
                                    value: entry.show,
                                    inline: false
                                },
                                {
                                    name: 'Date',
                                    value: entry.date.slice(0, 10),
                                    inline: false
                                },
                                {
                                    name: 'Ticket Type',
                                    value: entry.tixtype,
                                    inline: false
                                },
                                {
                                    name: 'Number Purchased',
                                    value: entry.bought,
                                    inline: false
                                },
                                {
                                    name: 'Number Scanned',
                                    value: entry.scanned,
                                    inline: false
                                },
                                {
                                    name: 'Phone Number On Order',
                                    value: entry.phone,
                                    inline: false
                                },
                                {
                                    name: 'Email On Order',
                                    value: entry.email,
                                    inline: false
                                }
                            ]
                        }
                        message.channel.send({ embed: result });
                    })

                }
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