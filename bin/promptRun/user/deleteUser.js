const fs = require('fs')
const { input } = require('../prompt-input')
const listUsers = require('./listUsers')
const { getUserData } = require('./index')

const deleteUser = () => {
    listUsers()
    console.log('\nType the index number from user that you want to delete.')

    try {
        const index = input('Index: ')
        const fileName = verifyIfIndexExist(index)
        const userData = getUserData(fileName)
        console.log(`\nDo you really wish delete ---> ${userData.name} <---?`)
        const answer = confirmDelete(userData)
        if(answer) { 
            deleteUserFile(fileName)
            console.log(`${userData.name} successful deleted. \n`)
        }
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }

}

module.exports = deleteUser

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

const confirmDelete = () => {
    try {
        const iValue = input('y/n: ')
        const formatedValue = iValue.toLowerCase()
        if(formatedValue == 'y') return 1
        else if(formatedValue == 'n') return 0
        else throw new Error()
    }
    catch {
        throw new Error('Invalid answer value')
    }
}

const deleteUserFile = (userFileName) => {
    try {
        fs.unlinkSync(`bin/users/${userFileName}`)
    }
    catch {
        throw new Error('Error on delete user file.')
    }
}