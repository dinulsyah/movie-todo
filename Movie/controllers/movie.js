const Movie = require('../models/movie')

class movieController{
    static findAll(req,res,next) {
        Movie
            .find({})
            .then((allMovies) => {
                res.status(200).json({
                    movies:allMovies
                })
            })
            .catch(next)
    }

    static findOneMovie(req, res, next) {
        Movie
            .findOne({ _id: req.params.id})
            .then((findOneMovie) => { res.status(200).json(findOneMovie) })
            .catch(next)
    }

    static createMovie(req, res, next) {
        const { title, overview, poster_path, popularity, tag, status} = req.body
        Movie
            .create({
                title, 
                overview, 
                poster_path, 
                popularity, 
                tag, 
                status
            })
            .then((createdMovie) => { res.status(201).json({ message: 'Added a new movie!', createdMovie }) })
            .catch(next)
    }


    static deleteMovie(req, res, next) {
        Movie
            .findOneAndDelete({ _id:req.params.id })
            .then((deletedMovie) => { res.status(200).json({ message: 'Deleted movie!', deletedMovie }) })
            .catch(next)
    }

    static updateMovie(req, res, next) {
        const { title, overview, poster_path, popularity, tag, status } = req.body
        const data = { 
            title, 
            overview, 
            poster_path, 
            popularity, 
            tag, 
            status 
        }
        
        Movie
            .findOneAndUpdate({ _id: req.params.id }, data , { new: true })
            .then((updatedMovie) => { res.status(200).json({ message: 'Updated movie!', updatedMovie }) })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err.message)
            })
    }
}

module.exports = movieController