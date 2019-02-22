const readFiles = require('./readFiles')
const path = require('path')

module.exports = function(app){
    app.get('/', (req, res) => {
        const files = readFiles()
        res.send(files)
    })
    app.get('/api/pdf/:file', (req,res) => {
        const p = req.params.file.replace('_',' ').replace('%20','_')
        console.log(p)
        res.sendFile(path.join(__dirname,`./../tests/${p}`))
    })
}