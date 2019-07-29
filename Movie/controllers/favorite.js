const Favorite = require('../models/favorite')

class Controller{
    static getFavorite(req,res,next){
        Favorite
            .find({})
            .then((favorites) => {
                res.status(200).json(favorites)
            })
            .catch(next)
    }
    
    static createFavorite(req,res,next){
        const { title , planDate, poster_path} = req.body
        Favorite
            .create({
                title,
                planDate,
                poster_path,
            })
            .then((data) => {
                res.status(200).json({
                    _id:data._id,
                    title:data.title,
                    poster_path:data.poster_path,
                    planDate:data.planDate
                })
            })
            .catch(next)
    }

    static deleteFavorite(req,res,next){
        Favorite
            .findByIdAndDelete(req.params.id)
            .then((data) => {
                res.status(200).json({
                    _id:data
                })
            })
            .catch(next)
    }
}

module.exports = Controller