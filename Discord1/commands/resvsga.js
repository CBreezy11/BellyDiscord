const fetch = require('node-fetch');

module.exports = {
    name: 'resvsga',
    description: '!resvsga',
    async execute(message, args) {
        const searchQuery = args.join(' ');
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                searchTerm: searchQuery,
                sortBy: 'show_data',
                onSale: 1
            })
        }
        var firstDate = ""
        const proxyURL = 'https://cors-anywhere.herokuapp.com/',
            targetURL = 'https://uw9pan87i1.execute-api.us-west-2.amazonaws.com/test'
        await fetch(targetURL, requestOptions)
            .then(resonse => {
                return resonse.json()
            }).then(jsonResponse => {
                console.log(jsonResponse[0].dailySales[0])
                firstDate = jsonResponse[0].dailySales[0].firstDayOnSale;
            });
        const URL = 'https://cors-anywhere.herokuapp.com/',
            tURL = 'https://xsk2u9ypb4.execute-api.us-west-2.amazonaws.com/test'
        await fetch(tURL, requestOptions)
            .then(resonse => {
                return resonse.json()
            }).then(jsonResponse => {
                console.log(firstDate)
                const fDate = new Date(firstDate);
                const r50date = new Date(jsonResponse[0].reserve50Date)
                const r50days = parseInt((r50date - fDate) / (1000 * 60 * 60 * 24) + 1)
                const g50date = new Date(jsonResponse[0].ga50Date)
                const g50days = parseInt((g50date - fDate) / (1000 * 60 * 60 * 24) + 1)
                var rsell = 0;
                if (jsonResponse[0].reserveSellout != 0) {
                    const rsellDate = new Date(jsonResponse[0].reserveSellDate)
                    rsell = parseInt((rsellDate - fDate) / (1000 * 60 * 60 * 24) + 1)
                }
                var gasell = 0;
                if (jsonResponse[0].gaSellout != 0) {
                    const gasellD = new Date(jsonResponse[0].gaSellDate)
                    gasell = parseInt((gasellD - fDate) / (1000 * 60 * 60 * 24) + 1)
                }
                const result = {
                    color: 0x0099ff,
                    fields: [
                        {
                            name: 'Show Name',
                            value: jsonResponse[0].show,
                            inline: false
                        },
                        {
                            name: 'Days To Sell 50% Of Reserve',
                            value: r50days,
                            inline: false
                        },
                        {
                            name: 'Date 50% Reserve Was Sold',
                            value: jsonResponse[0].reserve50Date,
                            inline: false
                        },
                        {
                            name: 'Days To Sell Out Reserve',
                            value: rsell,
                            inline: false
                        },
                        {
                            name: 'Date Reserve Sold Out',
                            value: jsonResponse[0].reserveSellDate,
                            inline: false
                        },
                        {
                            name: 'Days To Sell 50% Of GA',
                            value: g50days,
                            inline: false
                        },
                        {
                            name: 'Date 50% GA Was Sold',
                            value: jsonResponse[0].ga50Date,
                            inline: false
                        },
                        {
                            name: 'Days To Sell Out GA',
                            value: gasell,
                            inline: false
                        },
                        {
                            name: 'Date GA Sold Out',
                            value: jsonResponse[0].gaSellDate,
                            inline: false
                        }
                    ]
                }
                message.channel.send({ embed: result })
            })

    }
}