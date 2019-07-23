const express = require('express');
const axios = require('axios');
const redis = require("redis"),
client = redis.createClient();
const router = express.Router();

/* GET home page. */
router.get('/entertainme', function(req, res, next) {
	client.get('entertainme', async function(err, reply) {
	    // reply is null when the key is missing
	    if(reply){
        console.log('masukk')
	    	console.log(reply)
	    	res.status(200).json(JSON.parse(reply))
	    } else {
        console.log('masuk belum')
	    	try {
          let axiosTv = await axios.get('http://localhost:3002/tv')
          const tvSeries = axiosTv.data

          let axiosMovies = await axios.get('http://localhost:3001/movies')
          const movies = axiosMovies.data
          
          const data = {
            ...tvSeries,
            ...movies
          }

	    		client.set(
	    			'entertainme',
	    			JSON.stringify(data),
	    			'EX',
	    			20
          )

          res.status(200).json(data)
	    	} catch (err) {
	    		res.status(400).json(err.message)
	    	}
	    }
	});
});

module.exports = router;