const { input } = require('../prompt-input')
const Browser = require('../../class/browser')
const Page = require('../../class/page')
const Snkr = require('../../class/snkr')
const { gotoSnkrPage, getAndFormatSnkrData } = require('../../utils/snkr_data')
const LoadingAnimation = require('loading-animation')

let loadAnimation

const addUser = async() => {
    console.log('\n')
    const snkr = new Snkr()

    askAndSetSnkrLink(snkr)

    loadAnimation = new LoadingAnimation(['Loading snkr page',' '],)
    const browser = await new Browser()
    try {
        const page = await new Page(browser.getBrowser())
        await tryGotoSnkrsPage(snkr.getSnkrLink(), page)
        loadAnimation.stop('DONE. ✓ ')

        loadAnimation = new LoadingAnimation(['Fetching snkr data',' '],)
        const data = await getAndFormatSnkrData(page)
        loadAnimation.stop('DONE. ✓ ')
        console.table(Object.keys(data.sizes))
        askAndSetSnkrSize(snkr, data.sizes)
        setSnkrName(snkr, data.snkr_name)
        setSnkrId(snkr, data.snkr_id)
        setSnkrSizeId(snkr, data.sizes[snkr.getSnkrSize()].ProdutoId)
        setSnkrSizeCode(snkr, data.sizes[snkr.getSnkrSize()].Codigo)
        setSnkrSalePrice(snkr, data.snkr_sale_price)
        setSnkrRelease(snkr, data.snkr_release)
        
        snkr.saveConfigs()

        console.log(`\n --- ${snkr.getSnkrName()} Size ${snkr.getSnkrSize()} successful set. --- \n`)
    }
    catch (err) {
        loadAnimation.stop('ERROR. ')
        console.log(`${err} ✕\n`)
    }

    browser.closeBrowser()
}

module.exports = addUser

const tryGotoSnkrsPage = async(link, page) => {
    try {
        await gotoSnkrPage(link, page)
    }
    catch {
        throw new Error('Error on acess snkr page')
    }
}

const askAndSetSnkrLink = (snkr) => {
    try {
        const iLink = input('Type the snkr link: ')
        setSnkrLink (snkr, iLink)
    }
    catch {
        askAndSetSnkrLink(snkr)
    }
}

const setSnkrLink = (snkr, link) => {
    try {
        const formatedLink = link.trim()
        snkr.setSnkrLink(formatedLink)
        console.log(`Snkr link succesful set. ✓\n`)
    }
    catch {
        throw new Error('Error on set snkr link. ✕\n')
    }
}

const askAndSetSnkrSize = (snkr, sizes) => {
    try {
        const iSize = input('Type the snkr size value: ')
        const formatedSize = iSize.trim()
        setSnkrSize(snkr, formatedSize, sizes)
    }
    catch (err) {
        console.log(`${err} ✕\n`)
        askAndSetSnkrSize(snkr, sizes)
    }
}

const setSnkrSize = (snkr, size, sizes) => {
    try {
        if(sizes[size]) {
            snkr.setSnkrSize(size)
            console.log(`${size} successful set. ✓\n`)
        }
        else throw new Error()
    }
    catch {
        throw new Error('Error on set snkr size.')
    }
}

const setSnkrName = (snkr, name) => {
    try {
        snkr.setSnkrName(name)
    }
    catch {
        throw new Error('Error on set snkr name.\n')
    }
}

const setSnkrId = (snkr, id) => {
    try {
        snkr.setSnkrId(id)
    }
    catch {
        throw new Error('Error on set snkr id.\n')
    }
}

const setSnkrSalePrice = (snkr, price) => {
    try {
        snkr.setSnkrSalePrice(price)
    }
    catch {
        throw new Error('Error on set snkr price.\n')
    }
}

const setSnkrRelease = (snkr, release) => {
    try {
        snkr.setSnkrRelease(release)
    }
    catch {
        throw new Error('Error on set snkr release date.\n')
    }
}

const setSnkrSizeId = (snkr, sizeId) => {
    try {
        snkr.setSnkrSizeId(sizeId)
    }
    catch {
        throw new Error('Error on set snkr size id.\n')
    }
}

const setSnkrSizeCode = (snkr, sizeCode) => {
    try {
        snkr.setSnkrSizeCode(sizeCode)
    }
    catch {
        throw new Error('Error on set snkr size code.\n')
    }
}