module.exports = {
    name: 'db',
    desription: '!db',
    execute(message, response) {
        const result = {
            color: 0x0099f,
            fields: [
                {
                    name: '!resvsga {date}',
                    value: `Receive a report of number of pacing between GA and reserve tickets including
                    date and how many days each ticket to reach 50% of sell out and sell out.\n
                    Usage Example\n
                    !resvsga 12/31/19`,
                    inline: false
                }
            ]
        }
        message.channel.send({ embed: result })
    }
}