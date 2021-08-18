const fs = require('fs')
const { getUsersData } = require('./index')

const listUsers = () => {
    try {
        const usersFileName = fs.readdirSync('bin/users')
        const usersData = getUsersData(usersFileName)
        const formatedUsersData = formatUsersData(usersData)

        console.table(
            formatedUsersData,
            ['name', 'nike_email']
        )
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
