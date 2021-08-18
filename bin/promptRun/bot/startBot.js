const Browser = require('../../class/browser')
const Page = require('../../class/page')
const LoadingAnimation = require('loading-animation')

const listUsers = require('../user/listUsers')
const selectUser = require('../user/selectUser')

const listSnkrs = require('../snkr/listSnkrs')
const selectSnkr = require('../snkr/selectSnkr')

const { 
    fetchAddCart, 
    fetchTwoFactorGenerate, 
    fetchTwoFactorValidate
} = require('../../utils/nike_buy_snkr')
const {
    gotoLoginPage,
    fetchLogin,
    getClientIdByUrl,
    getLoginAuthToken,
    validateLoginAuthToken
} = require('../../utils/nike_login')

const startBot = async () => {
    
    // const b1 = await new Browser()
    // const page = await new Page(b1.getBrowser())
    // await gotoLoginPage(page)
    // const cliendId = await getClientIdByUrl(page.url())
    // const res = await fetchLogin('', '', cliendId, page)
    // const authToken = await getLoginAuthToken(res)
    // await validateLoginAuthToken(page, authToken)

    // input('logged? y/n: ')
    // const snkrLink = 'https://www.nike.com.br/air-max-95-153-169-211-350585'
    // const sizeCode = '195244695669'
    // const sizeId = '350593'
    // const cellPhone = ''
    // await fetchAddCart(snkrLink, sizeCode, page)
    // await fetchTwoFactorGenerate(snkrLink, sizeId, cellPhone, page)
    // const vCode = input('Cellphone verification code: ')
    // await fetchTwoFactorValidate(snkrLink, sizeId, vCode, page)
    // await fetchAddCart(snkrLink, sizeCode, page)

    // const checkoutPage = await new Page(b1.getBrowser())
    // checkoutPage.goto('https://www.nike.com.br/checkout')
}

module.exports = startBot