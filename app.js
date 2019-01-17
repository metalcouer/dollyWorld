const express = require('express')
const app = express()
const port = 3003
const data = require("./data.json")
const cors = require('cors')

app.use(cors())

app.use(express.static('public'))

app.get('/data', (req,res, next) => {
    res.status(200).send({
        "message": 'sucess!',
        "data": data
    })
})

app.get('/:tag', (req, res, next) => {
    const tag = req.params.tag
    if(!data.tags.includes(tag)){
        res.status(404).send('No Existe')
    }
    else {
        const matching = data.songs.filter(song => song.tags.includes(tag))
        res.status(200).send(matching)}
})

app.use((req, res, next) => {
    res.status(404).send('Route does not exist.')
})

app.listen(port, () => console.log(`Porty on ${port}`))