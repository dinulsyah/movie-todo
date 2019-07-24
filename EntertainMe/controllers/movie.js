const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

class movieController{
    static findAll(req,res,next) {
      client.get('Movie', async (err, reply) => {
          if (err) {
            next(err)
          } 
          else {
            if (reply) {
              res.status(200).json(JSON.parse(reply))
            } 
            else {
              try {
                let {data} = await axios.get('http://localhost:3001/movies')
                client.set('Movie', JSON.stringify(data), 'EX', 60)
                res.status(200).json(data)
              } 
              catch (err) {
                next(err)
              }
            }
          }
        })
    }

    static findOneMovie(req, res, next) {
      axios.get(`http://localhost:3001/movies/${req.params.id}`)
        .then(({data}) => {
          res.status(200).json(data)
        })
        .catch(next)
    }

    static async createMovie(req, res, next) {
        let newMovie = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tag: req.body.tag,
            status:req.body.status
        }
        try {
            let {data} = await axios({
              method: 'post',
              url: 'http://localhost:3001/movies',
              data: newMovie
            })
            let newData = data
            client.get('Movie', async (err, reply) => {
              if (err) {
                next(err)
              } 
              else {
                try {
                  let {data} = await axios.get('http://localhost:3001/movies')
                  client.set('Movie', JSON.stringify(data), 'EX', 60)
                  res.status(200).json(newData)
                } 
                catch (err) {
                  next(err)
                }
              }
            })
          } 
          catch (err){
            next(err)
          }
    }


    static async deleteMovie(req, res, next) {
        try {
            let {data} = await axios.delete(`http://localhost:3001/movies/${req.params.id}`)
            let result = data
            client.get('Movie', async (err, reply) => {
              if (err) {
                next(err)
              } 
              else {
                try {
                  let {data} = await axios.get('http://localhost:3001/movies')
                  client.set('Movie', JSON.stringify(data), 'EX', 60)
                  res.status(200).json(result)
                } 
                catch (err) {
                  next(err)
                }
              }
            })
          } 
          catch (err){
            next(err)
          }
    }

    static async updateMovie(req, res, next) {
        let updates = {
            title: req.body.title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            popularity: req.body.popularity,
            tag: req.body.tag,
            status:req.body.status
          }
          try {
            let {data} = await axios({
              method: 'put',
              url: `http://localhost:3001/movies/${req.params.id}`,
              data: updates
            })
            let updateData = data
            client.get('Movie', async (err, reply) => {
              if (err) {
                next(err)
              } 
              else {
                try {
                  let {data} = await axios.get('http://localhost:3001/movies')
                  client.set('Movie', JSON.stringify(data), 'EX', 60)
                  res.status(200).json(updateData)
                } 
                catch (err) {
                  next(err)
                }
              }
            })
          } 
          catch (err){
            next(err)
          }
    }
}

module.exports = movieController