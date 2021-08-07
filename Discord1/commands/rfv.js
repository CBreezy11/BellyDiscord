const fetch = require('node-fetch');

module.exports = {
    name: 'rfv',
    description: '!rfv',
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
                var rfv = {
                    location: "Roaring Fork Valley",
                    tickets: 0
                }
                zips.map(entry => {
                    if (entry.location != "Front Range" && entry.location != "Other Mountains" && entry.location != "Western Slope" && entry.location != "Vail" && entry.location != "Out of State") {
                        rfv.tickets += entry.quantity
                    }
                })
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
                            value: rfv.location,
                            inline: false
                        },
                        {
                            name: 'Quantity Sold',
                            value: rfv.tickets,
                            inline: false
                        },
                        {
                            name: 'Percentage Of Overall Sales',
                            value: Math.round((rfv.tickets / 450) * 100) + "%",
                            inline: false
                        }
                    ]
                }
                message.channel.send({ embed: result })
            })

    }
}