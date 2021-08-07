const fetch = require('node-fetch');

module.exports = {
    name: 'showlist',
    description: '!showlist',
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
                jsonResponse.map(entry => {
                    const result = {
                        color: 0x0099ff,
                        fields: [
                            {
                                name: 'Show Name',
                                value: entry.show,
                                inline: false
                            }
                        ]
                    }
                    message.channel.send({ embed: result })
                })
            })
    }
}






