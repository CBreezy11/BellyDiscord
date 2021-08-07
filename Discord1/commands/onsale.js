const fetch = require('node-fetch');

module.exports = {
    name: 'onsale',
    description: '!onsale',
    async execute(message, args) {
        const searchQuery = args[0];
        const onSale = args[1];
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                searchTerm: searchQuery,
                sortBy: 'show_data',
                onSale: onSale
            })
        }
        const proxyURL = 'https://cors-anywhere.herokuapp.com/',
            targetURL = 'https://uw9pan87i1.execute-api.us-west-2.amazonaws.com/test'
        await fetch(targetURL, requestOptions)
            .then(resonse => {
                return resonse.json()
            }).then(jsonResponse => {
                const dailySales = jsonResponse[0].dailySales
                const result = {
                    color: 0x0099ff,
                    fields: [
                        {
                            name: 'Show Name',
                            value: jsonResponse[0].show,
                            inline: false
                        },
                        {
                            name: 'First Day On Sale',
                            value: dailySales[0].firstDayOnSale,
                            inline: false
                        },
                        {
                            name: 'Number Of Days',
                            value: dailySales[0].numberOfDays,
                            inline: false
                        },
                        {
                            name: 'Number Of Orders',
                            value: dailySales[0].orders,
                            inline: false
                        },
                        {
                            name: 'Number Of Tickets',
                            value: dailySales[0].quantity,
                            inline: false
                        },
                        {
                            name: 'Cumalitve Running Percent Sold Of 450',
                            value: dailySales[0].runningPercent,
                            inline: false
                        }
                    ]
                }

                message.channel.send({ embed: result })
            })
    }
}
