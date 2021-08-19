const fs = require('fs')
const { input } = require('../prompt-input')
const listSnkrs = require('./listSnkrs')
const { getSnkrData } = require('./index')

const deleteSnkr = () => {
    listSnkrs()
    console.log('\nType the index number from snkr that you want to delete.')

    try {
        const index = input('Index: ')
        const fileName = verifyIfIndexExist(index)
        const snkrData = getSnkrData(fileName)
        console.log(`\nDo you really wish delete '${snkrData.snkr_name} - ${snkrData.snkr_size}'?`)
        const answer = confirmDelete()
        if(answer) { 
            deletesnkrFile(fileName)
            console.log(`'${snkrData.snkr_name} - ${snkrData.snkr_size}' successful deleted. \n`)
        }
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }
}

module.exports = deleteSnkr

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

const confirmDelete = () => {
    try {
        const iValue = input('y/n: ')
        const formatedValue = iValue.toLowerCase()
        if(formatedValue == 'y') return 1
        else if(formatedValue == 'n') return 0
        else throw new Error()
    }
    catch {
        throw new Error('Invalid answer value')
    }
}

const deletesnkrFile = (snkrFileName) => {
    try {
        fs.unlinkSync(`bin/snkrs/${snkrFileName}`)
    }
    catch {
        throw new Error('Error on delete snkr file.')
    }
}