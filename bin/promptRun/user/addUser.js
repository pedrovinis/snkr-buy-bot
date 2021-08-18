const { input, secretInput } = require('../prompt-input')
const fs = require('fs')
const login = require('../../utils/nike_login')
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

    loadAnimation = new LoadingAnimation(['Loading login page ',' '],)
    const browser = await new Browser()

    try {
        const page = await new Page(browser.getBrowser())
        await gotoNikeLoginPage(page)
        loadAnimation.stop('DONE. ✓ ')

        loadAnimation = new LoadingAnimation(['Getting get Nike Auth Token ',' '],)
        const clientId = await getNikeClientIdByUrl(page.url())
        const resNikeLogin = await fetchNikeLogin(page, user, clientId)
        const authToken = await getNikeLoginAuthToken(resNikeLogin)
        loadAnimation.stop('DONE. ✓ ')

        loadAnimation = new LoadingAnimation(['Validating Nike Auth Token',' '],)
        await validateNikeLogin(page, authToken)
        loadAnimation.stop('DONE. ✓ ')
        
        const authCookie = await getAuthCookieValue(page)
        setNikeAuthCookie(user, authCookie)
        setNikeAuthCreation(user)
        user.setNikePassword('SECRET')
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

const gotoNikeLoginPage = async(page) => {
    try {
        await login.gotoLoginPage(page)
    }
    catch {
        console.log('Error on get Login Page')
        console.log('Tryng again...')
        await new Promise(r => setTimeout(r, 6000))
        await gotoLoginPage(page)
    }
}

const getNikeClientIdByUrl = async(url) => {
    try {
        const clientId = await login.getClientIdByUrl(url)
        return clientId
    }
    catch {
        throw new Error('Error on get Nike client id.')
    }
}

const fetchNikeLogin = async(page, user, clientId) => {
    try {
        const email = user.getNikeEmail()
        const password = user.getNikePassword()
        const res = await login.fetchLogin(email, password, clientId, page)
        if(res.status()!= 200) throw new Error('Error on fetch Nike Login. Your credentials may be wrong.')
        return res
    }
    catch {
        throw new Error('Error on fetch Nike Login.')
    }
}

const getNikeLoginAuthToken = async(fetchLoginResponse) => {
    try {
        const authToken = await login.getLoginAuthToken(fetchLoginResponse)
        return authToken
    }
    catch {
        throw new Error('Error on get Nike auth token.')
    }
}

const validateNikeLogin = async(page, authToken) => {
    try {
        await login.validateLoginAuthToken(page, authToken)
    }
    catch {
        throw new Error('Error on validate Nike login.')
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

const getAuthCookieValue = async(page) => {
    try {
        const allCookies = await page.getCookies()
        const authCookie = allCookies.find( (cookie) => {
            return cookie.name == 'IFCSHOPSESSID'
        })
        return authCookie.value
    }
    catch {
        throw new Error('Error on get Nike auth token.')
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
