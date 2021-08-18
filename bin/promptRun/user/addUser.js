const { input, secretInput } = require('../prompt-input')
const { nikeLogin, setAuthCookie, getAuthCookieValue} = require('../../utils/nike_login')
const User = require('../../class/user')
const Browser = require('../../class/browser')
const Page = require('../../class/page')
const LoadingAnimation = require('loading-animation')

let loadAnimation

const addUser = async() => {
    console.log('\n')
    const user = new User()

    askAndSetName(user)
    askAndSetEmail(user)
    askAndSetPassword(user)

    loadAnimation = new LoadingAnimation(['Starting connection ',' '],)
    const browser = await new Browser()
    const page = await new Page(browser.getBrowser())
    loadAnimation.stop('DONE. ✓ ')

    try {
        loadAnimation = new LoadingAnimation(['Trying to login ',' '],)
        await nikeLogin(page, user)
        loadAnimation.stop('DONE. ✓ ')

        const authCookie = await getAuthCookieValue(page)
        setNikeAuthCreation(user)
        user.setiNike_auth_session_cookie(authCookie)
        user.setNikePassword('SECRET')
        user.setNikeSmsPhone('SECRET')
        
        saveConfigs(user)

        console.log(`\n --- ${user.getName()} successful set. --- \n`)
    }
    catch (err) {
        loadAnimation.stop('ERROR. ')
        console.log(`${err} ✕\n`)
    }

    browser.closeBrowser()
}

module.exports = addUser

const askAndSetName = (user) => {
    try {
        const iName = input('Type a name for this user: ')
        setName(user, iName)
    }
    catch {
        askAndSetName(user)
    }
}

const setName = (user, name) => {
    try {
        const formatedName = name.trim()
        user.setName(formatedName)
        console.log(`${name} succesful set. ✓\n`)
    }
    catch (err) {
        console.log(err)
        throw new Error('Error on set name. ✕\n')
    }
}

askAndSetEmail = (user) => {
    try {
        const iEmail = input('Type your NIKE email: ')
        setEmail(user, iEmail)
    } 
    catch {
        askAndSetEmail()
    }
}

const setEmail = (user, email) => {
    try {
        user.setNikeEmail(email)
        console.log(`${email} succesful set. ✓\n`)
    }
    catch {
        console.log('Error on set email. ✕\n')
    }
}

const askAndSetPassword = (user) => {
    try {
        const iPassword = secretInput('Type your NIKE password:')
        setPassword(user, iPassword)
    }
    catch {
        askAndSetPassword(user)
    }
}

const setPassword = (user, password) => {
    try {
        user.setNikePassword(password)
        console.log(`SECRET Password succesful set. ✓\n`)
    }
    catch {
        console.log('Error on set password. ✕\n')
    } 
}

const setNikeAuthCookie = (user, authToken) => {
    try {
        user.setiNike_auth_session_cookie(authToken)
    }
    catch {
        throw new Error('Error on set Nike auth token.')
    }
}

const setNikeAuthCreation = (user) => {
    try {
        const timeNow = Math.round( new Date().getTime() / 1000 )
        user.setNike_auth_creation(timeNow)
    }
    catch {
        throw new Error('Error on set Nike Auth Creation.')
    }
}



const saveConfigs = (user) => {
    try {
        user.saveConfigs()
        console.log('Configurations saved Succesful. ✓\n')
    }
    catch {
        throw new Error('Error on saving configuratitons.')
    }
}
