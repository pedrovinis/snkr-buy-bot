const fs = require('fs')
const { getSnkrsData } = require('./index')

const listSnkrs = () => {
    try {
        const snkrsFileName = fs.readdirSync('bin/snkrs')
        const snkrsData = getSnkrsData(snkrsFileName)
        const formatedSnkrsData = formatSnkrsData(snkrsData)

        console.table(
            formatedSnkrsData,
            ['name', 'size', 'price', 'release']
        )
    }
    catch (err) {
        console.log(`${err} ✕\n`)
    }

}

module.exports = listSnkrs

const formatSnkrsData = (snkrsData) => {
    try {
        const formatedsnkrsData = snkrsData.map( (snkrData) => {
            const formatedDate = formatRelease(snkrData.snkr_release)

            return {
                name: snkrData.snkr_name,
                size: snkrData.snkr_size,
                price: snkrData.snkr_sale_price,
                release: formatedDate
            }
        })
        return formatedsnkrsData
    }
    catch {

    }
}

const formatRelease = (release) => {
    if(release=='released') return release
    const timeStamp = new Date(release * 1000)
    const formatedDate = timeStamp.toLocaleString('pt-BR')
    return formatedDate
}