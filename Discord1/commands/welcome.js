module.exports = {
    name: 'welcome',
    desription: '!welcome',
    execute(message, response) {
        const result = {
            color: 0x0099f,
            fields: [
                {
                    name: 'Welcome To Belly Up Aspen!!!!!!!\n\n',
                    value: `\n\nWe are so glad to have you as a part of the team.\n\n
                            This tool is hwat we use to keep all of us at Belly Up connected and in the
                            know of all things Belly Up.\n\n
                            Very soon we will assign you a role here in Discord corresponding with your position at Belly Up.  This
                            will unlock all the necessary channels for you.\n\n
                            If you ever have any questions at all please never hesistate to reach out to Brandon by sending a DM to him here in Discord.\n\n
                            Thank you and welcome to the team!!!!`,
                    inline: false
                }
            ]
        }
        message.channel.send({ embed: result })
    }
}