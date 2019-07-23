const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3002
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')

mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/tvseries',{ useNewUrlParser: true }, (err) => {
    if(err) console.log('database failed to connect..')
    else{
        console.log('database connection established')
    }
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',routes)

app.use(errorHandler)

app.listen(port,() => {
    console.log(`listen to port:${port}`)
})