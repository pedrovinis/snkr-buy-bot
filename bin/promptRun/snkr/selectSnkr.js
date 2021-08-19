const fs = require('fs')
const { input } = require('../prompt-input')
const { getSnkrData, getSnkrsData } = require('./index')

const selectSnkr = () => {
    console.log('\nType the index number from snkr that you want to select.')

    try {
        const index = input('Index: ')
        const snkrData = verifyIfIndexExistsAndReturnData(index)
        console.log(`'${snkrData.snkr_name} - ${snkrData.snkr_size}' successful selected. ✓\n`)
        return snkrData
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }
}

module.exports = selectSnkr

const verifyIfIndexExistsAndReturnData = (index) => {
    try {
        const snkrsFileName = fs.readdirSync('bin/snkrs')
        const snkrsData = getSnkrsData(snkrsFileName)
        const snkrsDataSorted = snkrsData.sort((a, b) => a.snkr_release - b.snkr_release)
        const data = snkrsDataSorted[index]
        if(!data) throw new Error('Index value invalid.')
        else return data 
    }
    catch {
        throw new Error('Index value invalid.')
    }
}