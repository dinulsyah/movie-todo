const Tv = require('../models/tv')

class tvController{
    static findAll(req,res,next) {
        Tv
            .find({})
            .then((allSeries) => {
                res.status(200).json({
                    series:allSeries
                })
            })
            .catch(next)
    }

    static findOneTv(req, res, next) {
        Tv
            .findOne({ _id: req.params.id})
            .then((findOneSeries) => { res.status(200).json(findOneSeries) })
            .catch(next)
    }

    static createTv(req, res, next) {
        const { title, overview, poster_path, popularity, tag, status} = req.body
        Tv
            .create({
                title, 
                overview, 
                poster_path, 
                popularity, 
                tag, 
                status
            })
            .then((createdTvSeries) => { res.status(201).json({ message: 'Added a new Tv Series!', createdTvSeries }) })
            .catch(next)
    }


    static deleteTv(req, res, next) {
        Tv
            .findOneAndDelete({ _id:req.params.id })
            .then((deletedTvSeries) => { res.status(200).json({ message: 'Deleted Tv Series!', deletedTvSeries }) })
            .catch(next)
    }

    static updateTv(req, res, next) {
        const { title, overview, poster_path, popularity, tag, status } = req.body
        const data = { 
            title, 
            overview, 
            poster_path, 
            popularity, 
            tag, 
            status 
        }
        
        Tv
            .findOneAndUpdate({ _id: req.params.id }, data , { new: true })
            .then((updatedTvSeries) => { res.status(200).json({ message: 'Updated Tv Series!', updatedTvSeries }) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }
}

module.exports = tvController