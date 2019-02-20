const fs = require('fs')

module.exports = function() {
    const items = []
    fs.readdirSync('./tests').forEach(file => items.push(file))
    return items
}