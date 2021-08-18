const ps = require('prompt-sync')({
    sigint: true
})

const input = (message) => {
    return ps(message)   
}

const secretInput = (message) => {
    return ps(message, {echo: '*'})
}

module.exports = {
    input,
    secretInput
}