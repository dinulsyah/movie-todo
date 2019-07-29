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

  static youtubeVideo(req, res) {
    let {annotate} = req.headers
      axios
         .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${annotate}&type=video&key=${process.env.YOUTUBE}`)
         .then(({ data }) => {
             res.status(200).json(data)
         })
         .catch((err) => {
             console.log(err.response);
             res.status(500).json('error processing')
         })
 }
}

 module.exports = All