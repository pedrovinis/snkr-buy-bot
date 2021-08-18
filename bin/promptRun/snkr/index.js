const fs = require('fs')

const getsnkrsData = (snkrsFileName)=> {
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

const getsnkrData = (snkrFileName)=> {
    try {
        return JSON.parse(fs.readFileSync(`bin/snkrs/${snkrFileName}`, 'utf8'))
    }
    catch {
        throw new Error('Error on get snkr data.')
    }
}

module.exports = {
    getsnkrsData,
    getsnkrData,
}