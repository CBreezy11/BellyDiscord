const fetch = require('node-fetch');

module.exports = {
    name: 'zip',
    description: '!zip',
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
                const zips = jsonResponse[0].zipInfo
                zips.map(entry => {
                    const result = {
                        color: 0x0099ff,
                        fields: [
                            {
                                name: 'Show Name',
                                value: jsonResponse[0].show,
                                inline: false
                            },
                            {
                                name: 'Location',
                                value: entry.location,
                                inline: false
                            },
                            {
                                name: 'Quantity Sold',
                                value: entry.quantity,
                                inline: false
                            },
                            {
                                name: 'Sales in Dollars',
                                value: "$" + entry.sales,
                                inline: false
                            },
                            {
                                name: 'Percentage Of Overall Sales',
                                value: entry.percentage,
                                inline: false
                            }
                        ]
                    }
                    message.channel.send({ embed: result })
                })
            })
    }
}