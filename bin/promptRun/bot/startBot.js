const Browser = require('../../class/browser')
const Page = require('../../class/page')
const User = require('../../class/user')
const LoadingAnimation = require('loading-animation')
const botCfg = require('../../../bot.cfg.json')

const listUsers = require('../user/listUsers')
const selectUser = require('../user/selectUser')

const listSnkrs = require('../snkr/listSnkrs')
const selectSnkr = require('../snkr/selectSnkr')

const { 
    fetchAddCart, 
    fetchTwoFactorGenerate, 
    fetchTwoFactorValidate
} = require('../../utils/nike_buy_snkr')

const { nikeLogin, verifyLogged, getAuthCookieValue, setAuthCookie } = require('../../utils/nike_login')
const { input, secretInput } = require('../prompt-input')

const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms));

let loadAnim
let loginAttemps = 0

let loginTime = botCfg.login_before_drop_minutes * 60
let startBrowserTime = 1 * 60 
let dropTime = 0

const startBot = async () => {
    try {
        const user = new User()
        listUsers()
        const userData = selectUser()
        user.setNikeEmail(userData.nike_email)
        user.setNikePassword(secretInput('Type your nike password: '))
        user.setNikeSmsPhone(input('Type the cell to confirmation on buy: '))
    
        listSnkrs()
        const snkrData = selectSnkr()
        const snkrLink = snkrData.snkr_link
        const sizeCode = snkrData.snkr_size_code
        const sizeId = snkrData.snkr_size_id
        
        await waitFor(snkrData.snkr_release, loginTime)

        loadAnim = new LoadingAnimation(['Trying to login in nike website ',' '],)
        const b1 = await new Browser()
        await nikeLogin(b1, user)
        await verifyIfIsLogged(b1)
        loadAnim.stop('DONE. ✓ ')

        loadAnim = new LoadingAnimation(['Trying fetch login data nike website ',' '],)
        const authCookie = await getAuthCookieValue(b1)
        user.setiNike_auth_session_cookie(authCookie)
        await b1.closeBrowser()
        loadAnim.stop('DONE. ✓ ')
        
        await waitFor(snkrData.snkr_release, startBrowserTime)

        loadAnim = new LoadingAnimation(['Preparing to drop ',' '],)
        const b2 = await new Browser({headless:false})
        const nikehomePage = await new Page(b2.getBrowser())
        await nikehomePage.goto('https://www.nike.com.br/')
        await setAuthCookie(nikehomePage, authCookie)
        await nikehomePage.refresh()
        loadAnim.stop('DONE. ✓ ')

        await waitFor(snkrData.snkr_release, dropTime)
        
        loadAnim = new LoadingAnimation(['Requesting SMS verification ',' '],)
        await fetchAddCart(snkrLink, sizeCode, nikehomePage)
        await fetchTwoFactorGenerate(snkrLink, sizeId, user.getNikeSmsPhone(), nikehomePage)
        loadAnim.stop('DONE. ✓ ')

        console.log('\n')

        const vCode = input('SMS verification code: ')

        loadAnim = new LoadingAnimation(['Validating SMS code ',' '],)
        await fetchTwoFactorValidate(snkrLink, sizeId, vCode, nikehomePage)
        await fetchAddCart(snkrLink, sizeCode, nikehomePage)
        loadAnim.stop('DONE. ✓ ')
        
        const checkoutPage = await new Page(b2.getBrowser())
        await checkoutPage.goto('https://www.nike.com.br/checkout')
    }
    catch (err) {
        loadAnim.stop('ERROR. ✕ ')
        console.log(`${err} ✕\n`)
    }
}

module.exports = startBot


const waitFor = async(snkrDropTime, time) => {
    let cont = parseInt(snkrDropTime - ( new Date().getTime() / 1000 ))
    while(cont > time) {
        cont --
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`Time remaining to drop: '${cont} seconds' `)
        await sleep(1000)
    }
}

const verifyIfIsLogged = async(browser) => {
    try {
        const isLogged = await verifyLogged(browser)
        if(!isLogged) throw new Error()
    }
    catch {
        throw new Error('Error not logged')
    }
}