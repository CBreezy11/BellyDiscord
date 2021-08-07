module.exports = {
    name: 'requestoff',
    desription: '!requestoff',
    execute(message, response) {
        const result = {
            color: 0x0099f,
            fields: [
                {
                    name: 'Belly Up Aspen Request Off Form',
                    value: 'https://docs.google.com/forms/d/e/1FAIpQLSc41vVCnyfPBSI_jwEjp5ak0q8qtWLOrh42mmLBJdMv8OqoZA/viewform'
                }
            ]
        }
        message.channel.send({ embed: result })
    }
}