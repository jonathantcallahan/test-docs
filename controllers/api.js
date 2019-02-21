const readFiles = require('./readFiles')

module.exports = function(app){
    app.get('/', (req, res) => {
        const files = readFiles()
        res.send(files)
    })
}