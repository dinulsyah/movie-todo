const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
    title:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return mongoose.model('Favorite',favoriteSchema)
                    .findOne({title:v})
                    .then((title) => {
                        if(title) return false
                    })
                    .catch((err) => {
                       return false 
                    })
            },
            message:"This Movie is already On Favorites List"
        }
    },
    planDate:{
        type:String,
        required:true
    },
    poster_path:{
        type:String,
        required:true
    },
    // userId:{
    //     type:Schema.Types.ObjectId,
    //     ref:'User'
    // }
})

const Favorite = mongoose.model('Favorite',favoriteSchema)
module.exports = Favorite