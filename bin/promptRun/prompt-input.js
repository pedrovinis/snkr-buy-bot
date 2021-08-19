const complete = (commands) => {
    return (str) => {
      var ret = []
      for (let i=0; i< commands.length; i++) {
        if (commands[i].indexOf(str) == 0)
          ret.push(commands[i]);
      }
      return ret
    }
}

const commands = require('./commands/commands.json')

const ps = require('prompt-sync')({
    autocomplete: complete(Object.values(commands)),
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

