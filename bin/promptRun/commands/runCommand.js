const { commands } = require('./commands.json')
const config = require('../../config.json')
const startBot = require('../bot/startBot')
const listUsers = require('../user/listUsers')
const addUser = require('../user/addUser')
const deleteUser = require('../user/deleteUser')
const listSnkrs = require('../snkr/listSnkrs')
const addsnkr = require('../snkr/addSnkr')

const checkCommandAndRun = async(c) => {
    switch (c) {
        case commands.start:
            await startBot()
            break
        case commands.help:
            help()
            break
        case commands.users:
            listUsers()
            break
        case commands.adduser:
            await addUser()
            break
        case commands.deleteuser:
            deleteUser()
            break
        case commands.snkrs:
            listSnkrs()
            break
        case commands.addsnkr:
            await addsnkr()
            break
        case commands.version:
            version()
            break
        case commands.clear:
            clear()
            break
        case commands.exit:
            process.exit()
            break
        case commands.quit:
            process.exit()
            break
        default:
            notFound(c)
            break
    }
}

module.exports = checkCommandAndRun


const help = () => {
    console.table([
        { command: commands.start, description: 'Start SNKRS BOT.'}, 
        { command: commands.help, description: 'Show all list of commands.'}, 
        { command: commands.users, description: 'Show all users registred.'}, 
        { command: commands.adduser, description: 'Add and authenticate user nike credentials.'}, 
        { command: commands.deleteuser, description: 'Delete user nike credentials.'},
        { command: commands.snkrs, description: 'Show all snkrs registred and drop time remaining.'}, 
        { command: commands.addsnkr, description: 'Add snkr and.'}, 
        { command: commands.deletesnkr, description: 'Delete snkr info.'}, 
        { command: commands.version, description: 'Show actual Version.'},
        { command: commands.clear, description: 'Clear the application console.'},
        { command: `${commands.exit}`, description: 'Exit the program.'}, 
    ], 
    ['command', 'description'])
}

const version = () => {
    console.log(`pXv Snkr Buy Bot Version: ${config.version}`)
}

const clear = () => {
    console.clear()
}

const notFound = (c) => {
    if(c.length) c = `'${c}'`
    console.log(`Command ${c} not found. ✕`)
}