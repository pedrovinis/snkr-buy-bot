const fs = require('fs')

const getSnkrsData = (snkrsFileName)=> {
    try {
        const snkrsData = snkrsFileName.map( (snkrFileName) => {
            return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
            
        })
        return snkrsData
    }
    catch {
        throw new Error('Error on get snkrs data.')
    }
}

const getSnkrData = (snkrFileName)=> {
    try {
        return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
    }
    catch {
        throw new Error('Error on get snkr data.')
    }
}

module.exports = {
    getSnkrsData,
    getSnkrData,
}