const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tvSchema = new Schema({
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

const Tv = mongoose.model('Tv',tvSchema)
module.exports = Tv