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

const { nikeLogin, verifyLogged } = require('../../utils/nike_login')
const { input, secretInput } = require('../prompt-input')

const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms));

let loadAnim

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
    
        await waitForLoginTime(snkrData.snkr_release)
    
        loadAnim = new LoadingAnimation(['Trying to login in nike website ',' '],)
        const browser = await new Browser({headless:false})
        await nikeLogin(browser, user)
        const page = await new Page(browser.getBrowser({}))
        await page.goto('https://www.nike.com.br/')
        loadAnim.stop('DONE. ✓ ')
    
        await waitForDropTime(snkrData.snkr_release)
        
        await fetchAddCart(snkrLink, sizeCode, page)
        await fetchTwoFactorGenerate(snkrLink, sizeId, user.getNikeSmsPhone(), page)
        const vCode = input('Cellphone verification code: ')
        await fetchTwoFactorValidate(snkrLink, sizeId, vCode, page)
        await fetchAddCart(snkrLink, sizeCode, page)
    
        const checkoutPage = await new Page(browser.getBrowser())
        checkoutPage.goto('https://www.nike.com.br/checkout')
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }
}

module.exports = startBot


const waitForLoginTime = async(snkrDropTime) => {
    let cont = parseInt(snkrDropTime - ( new Date().getTime() / 1000 ))
    while(cont > botCfg.login_before_drop_minutes * 60) {
        cont --
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`Time remaining to drop: '${cont} seconds' `)
        await sleep(1000)
    }
}

const waitForDropTime = async(snkrDropTime) => {
    let cont = parseInt(snkrDropTime - ( new Date().getTime() / 1000 ))
    while(cont > 0) {
        cont --
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`Time remaining to drop: '${cont} seconds' `)
        await sleep(1000)
    }
}