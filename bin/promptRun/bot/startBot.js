const User = require('../../class/user')
const Browser = require('../../class/browser')
const Page = require('../../class/page')
const LoadingAnimation = require('loading-animation')
const { input, secretInput } = require('../prompt-input')
const botCFG = require('../../../bot.cfg.json')
let loadAnim

const login = require('../../utils/nike_login')

const startBot = async () => {
    const b1 = await new Browser()
    const p1 = await new Page(b1.getBrowser())
}

module.exports = startBot

const setAuthCookie = async (page, authCookie)=> {
    await page.setCookie({
        'name': 'IFCSHOPSESSID',
        'value': authCookie,
        'domain': '.nike.com.br'
    })
}