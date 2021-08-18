const fs = require('fs')
const { input } = require('../prompt-input')
const { getUserData } = require('./index')

const selectUser = () => {
    console.log('\nType the index number from user that you want to select.')

    try {
        const index = input('Index: ')
        const fileName = verifyIfIndexExist(index)
        const userData = getUserData(fileName)
        console.log(`'${userData.name}' successful selected. ✓\n`)
        return userData
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }
}

module.exports = selectUser

const verifyIfIndexExist = (index) => {
    try {
        const usersFileName = fs.readdirSync('bin/users')
        const file = usersFileName[index]
        if(!file) { throw new Error('Index value invalid.') }
        else { return file }
    }
    catch {
        throw new Error('Index value invalid.')
    }
}