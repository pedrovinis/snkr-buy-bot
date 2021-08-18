const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

class Browser  {
    constructor(cfg) {
        const args = [
            '--Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        ]
        this.options = {
            args,
            headless: false,    
            ignoreHTTPSErrors: true,
            defaultViewport: null,
        }
        return (async () => {
            await this.startBrowser()
            return this
        })()
    }

    async startBrowser() {
        this.browser = await puppeteer.launch({
            headless: this.options.headless
        })
    }

    getBrowser() {
        return this.browser
    }

    async closeBrowser() {
        await this.browser.close()
    }
}

module.exports = Browser