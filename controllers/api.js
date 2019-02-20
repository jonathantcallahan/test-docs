const readFiles = require('./readFiles')

module.exports = function(app){
    app.get('/', (req, res) => {
        console.log(readFiles())
        res.send('asdf')
    })
}