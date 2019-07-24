const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

class All{  
  static async findAll(req, res, next) {
    const movies = await new Promise ((resolve, reject) => {
      client.get('Movie', async (err, reply) => {
        if (err) {
          next(err)
        } 
        else {
        if (reply) {
            resolve (JSON.parse(reply))
        } 
        else {
            try {
              let {data} = await axios.get('http://localhost:3001/movies')
              client.set('Movie', JSON.stringify(data), 'EX', 60)
              resolve (data)
            } 
            catch (err) {
              next(err)
            }
          }
        }
      })
    })

    const tvSeries = await new Promise ((resolve, reject) => {
      client.get('TvSeries', async (err, reply) => {
        if (err) {
          next(err)
        } 
        else {
          if (reply) {
            resolve (JSON.parse(reply))
          } 
          else {
            try {
              let {data} = await axios.get('http://localhost:3002/tv')
              client.set('TvSeries', JSON.stringify(data), 'EX', 60)
              resolve (data)
            } 
            catch (err) {
              next(err)
            }
          }
        }
      })
    })

    const entertainme = {
        ...movies,
        ...tvSeries
    }

    res.status(200).json(entertainme)
  }
}

 module.exports = All