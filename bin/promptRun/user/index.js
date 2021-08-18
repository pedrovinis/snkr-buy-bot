const fs = require('fs')

const getUsersData = (usersFileName)=> {
    try {
        const usersData = usersFileName.map( (userFileName) => {
            return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
            
        })
        return usersData
    }
    catch {
        throw new Error('Error on get users data.')
    }
}

const getUserData = (userFileName)=> {
    try {
        return JSON.parse(fs.readFileSync(`bin/users/${userFileName}`, 'utf8'))
    }
    catch {
        throw new Error('Error on get user data.')
    }
}

module.exports = {
    getUsersData,
    getUserData,
}