const store = require('../../store')

function generateName(){
    const index = Math.floor(Math.random() * 11)
    return store.names[index]
}

module.exports = {
    generateName
}