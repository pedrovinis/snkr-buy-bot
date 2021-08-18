const fs = require('fs')
const { input } = require('../prompt-input')
const { getSnkrData } = require('./index')

const selectSnkr = () => {
    console.log('\nType the index number from snkr that you want to select.')

    try {
        const index = input('Index: ')
        const fileName = verifyIfIndexExist(index)
        const snkrData = getSnkrData(fileName)
        console.log(`'${snkrData.snkr_name} - ${snkrData.snkr_size}' successful selected. ✓\n`)
        return snkrData
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }
}

module.exports = selectSnkr

const verifyIfIndexExist = (index) => {
    try {
        const snkrsFileName = fs.readdirSync('bin/snkrs')
        const file = snkrsFileName[index]
        if(!file) { throw new Error('Index value invalid.') }
        else { return file }
    }
    catch {
        throw new Error('Index value invalid.')
    }
}