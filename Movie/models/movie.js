const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    title:{
        type:String,
        required:[true,'the field is required']
    },
    overview:{
        type:String
    },
    status:{
        type:String
    },
    poster_path:{
        type:String,
        required:[true,'the field is required']
    },
    popularity:{
        type:Number
    },
    tag:[{type:String}],
},{
    timestamps:true
})

const Movie = mongoose.model('Movie',movieSchema)
module.exports = Movie