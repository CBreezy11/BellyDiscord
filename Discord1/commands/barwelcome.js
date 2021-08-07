module.exports = {
    name: 'barwelcome',
    desription: '!barwelcome',
    execute(message, response) {
        const result = {
            color: 0x0099f,
            fields: [
                {
                    name: 'Welcome to the Belly Up Aspen Security Team!',
                    value: `Here we will keep some important references for you.  Upon first joining the team you should become very familiar with these.
                    They will remain here for easy lookup and access at any time for your convenience.\n
                    Thank you.`,
                    inline: false
                }
            ]
        }
        message.channel.send({ embed: result })
    }
}