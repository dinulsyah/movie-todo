const router = require('express').Router()
const movies = require('./movies')
const tvSeries = require('./tvseries')
const entertainme = require('../controllers/entertainme')
const graphqlHTTP = require('express-graphql') 
const schema = require('../schema')

router.get('/entertainme',entertainme.findAll)
router.get('/youtube',entertainme.youtubeVideo)
router.use('/movies',movies)
router.use('/tvSeries',tvSeries)
router.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

module.exports = router