const fs = require('fs')

class User {
    constructor(){
        this.userData = {
            nike_auth_session_cookie: '',
            nike_auth_creation: '',
            name: '',
            nike_email: '',
            nike_password: '',
            nike_sms_phone: '',
        }
    }

    setiNike_auth_session_cookie(token) {
        this.userData['nike_auth_session_cookie'] = token
    }

    getNike_auth_session_cookie() {
        return this.userData['nike_auth_session_cookie']
    }

    setNike_auth_creation(creation) {
        this.userData['nike_auth_creation'] = creation
    }

    getNike_auth_creation() {
        return this.userData['nike_auth_creation']
    }

    setName(name) {
        this.userData['name'] = name
    }

    getName() {
        return this.userData['name']
    }

    setNikeEmail(email) {
        this.userData['nike_email'] = email
    }

    getNikeEmail() {
        return this.userData['nike_email']
    }

    setNikePassword(password) {
        this.userData['nike_password'] = password
    }

    getNikePassword() {
        return this.userData['nike_password']
    }

    setNikeSmsPhone(phoneNumber) {
        this.userData['nike_sms_phone'] = phoneNumber
    }

    getNikeSmsPhone() {
        return this.userData['nike_sms_phone']
    }

    saveConfigs() {
        fs.writeFileSync(`bin/users/${this.userData.name}.json`, JSON.stringify(this.userData), 'utf8', ()=> {
        }) 
    }
}

module.exports = User