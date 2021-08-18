const fs = require('fs')


class snkr {
    constructor(){
        this.snkrData = {
            snkr_name: '',
            snkr_id: '',
            snkr_link: '',
            snkr_size: '',
            snkr_size_id: '',
            snkr_size_code: '',
            snkr_release: '',
            snkr_sale_price: ''
        }
    }

    setSnkrName(name) {
        this.snkrData['snkr_name'] = name
    }

    getSnkrName() {
        return this.snkrData['snkr_name']
    }

    setSnkrId(id) {
        this.snkrData['snkr_id'] = id
    }

    getSnkrId() {
        return this.snkrData['snkr_id']
    }

    setSnkrLink(link) {
        this.snkrData['snkr_link'] = link
    }

    getSnkrLink() {
        return this.snkrData['snkr_link']
    }

    setSnkrSize(size) {
        this.snkrData['snkr_size'] = size
    }

    getSnkrSize() {
        return this.snkrData['snkr_size']
    }

    setSnkrSizeId(sizeId) {
        this.snkrData['snkr_size_id'] = sizeId
    }

    getSnkrSizeId() {
        return this.snkrData['snkr_size_id']
    }

    setSnkrSizeCode(code) {
        this.snkrData['snkr_size_code'] = code
    }

    getSnkrSizeCode() {
        return this.snkrData['snkr_size_code']
    }

    setSnkrRelease(time) {
        this.snkrData['snkr_release_on'] = time
    }

    getSnkrRelease() {
        return this.snkrData['snkr_release_on']
    }

    setSnkrSalePrice(salePrice) {
        this.snkrData['snkr_sale_price'] = salePrice
    }

    getSnkrSalePrice() {
        return this.snkrData['snkr_sale_price']
    }

    saveConfigs() {
        fs.writeFileSync(`bin/snkrs/${this.snkrData.snkr_name}-${this.snkrData.snkr_id}-${this.snkrData.snkr_size}.json`, JSON.stringify(this.snkrData), 'utf8', ()=> {
        }) 
    }
}

module.exports = snkr