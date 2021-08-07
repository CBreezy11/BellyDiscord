const fetch = require('node-fetch');

module.exports = {
    name: 'showtix',
    description: '!showtix',
    async execute(message, args) {
        const searchQuery = args.join(' ');
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                searchTerm: searchQuery,
                sortBy: 'show_data'
            })
        }
        const proxyURL = 'https://cors-anywhere.herokuapp.com/',
            targetURL = 'https://uw9pan87i1.execute-api.us-west-2.amazonaws.com/test'
        await fetch(targetURL, requestOptions)
            .then(resonse => {
                return resonse.json()
            }).then(jsonResponse => {
                const tix = jsonResponse[0].ticketInfo
                tix.map(entry => {
                    const result = {
                        color: 0x0099ff,
                        fields: [
                            {
                                name: 'Show Name',
                                value: jsonResponse[0].show,
                                inline: false
                            },
                            {
                                name: 'Ticket Type',
                                value: entry.type,
                                inline: false
                            },
                            {
                                name: 'Quantity Sold',
                                value: entry.count,
                                inline: false
                            },
                            {
                                name: 'Price Of Ticket',
                                value: entry.price,
                                inline: false
                            },
                            {
                                name: 'Total Sales In Dollars',
                                value: entry.total,
                                inline: false
                            }
                        ]
                    }
                    message.channel.send({ embed: result })
                })
            })
    }
}






