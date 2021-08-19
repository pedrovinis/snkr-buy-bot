const config = require('../config.json')
const commands = require('./commands/commands.json')
const { input } = require('./prompt-input')
const checkCommandAndRun = require('./commands/runCommand')

const main = async() => {
    startMessage()
    let running = true

    while(running){
        let c = input('Type a command: ')
        await checkCommandAndRun(c)
    }
}

module.exports = main


const startMessage = () => {
    console.log('\n\n --- pXv Snkrs Buy Bot --- \n\n')
    console.log(`Welcome, type '${commands.help}' to show command list`)
    console.log(`Type '${commands.start}' to start the bot.`)
    console.log(`The bot is configured to work in ${config.locale} website, use the software in another locale may not work.\n`)
}