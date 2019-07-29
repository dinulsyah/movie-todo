require('dotenv').config()
const cors = require('cors')

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3001
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')

mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true }, (err) => {
    if(err) console.log('database failed to connect..')
    else{
        console.log('database connection established')
    }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',routes)

app.use(errorHandler)

app.listen(port,() => {
    console.log(`listen to port:${port}`)
})