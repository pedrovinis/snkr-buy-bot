const fs = require('fs')
const { getUsersData } = require('./index')
const { commands } = require('../commands/commands.json')

const listUsers = () => {
    try {
        const usersFileName = fs.readdirSync('bin/users')
        const usersData = getUsersData(usersFileName)
        const formatedUsersData = formatUsersData(usersData)

        if(formatedUsersData.length > 0) {
            console.table(
                formatedUsersData,
                ['name', 'nike_email']
            )
        }
        else { console.log(`\nNo users added. Type '${commands.adduser}' to add a user.\n`) }
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }

}

module.exports = listUsers

const formatUsersData = (usersData) => {
    try {
        const formatedUsersData = usersData.map( (userData) => {
            return {
                name: userData.name,
                nike_email: userData.nike_email,
            }
        })
        return formatedUsersData
    }
    catch {

    }
}
