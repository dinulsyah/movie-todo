const router = require('express').Router()
const movieController = require('../controllers/movie')
const favoriteController = require('../controllers/favorite')

router.get('/movies',movieController.findAll)
router.get('/favorite', favoriteController.getFavorite)
router.get('/movies/:id',movieController.findOneMovie)
router.post('/movies',movieController.createMovie)
router.post('/addFavorite', favoriteController.createFavorite)
router.delete('/deleteFavorite/:id',favoriteController.deleteFavorite)
router.delete('/movies/:id', movieController.deleteMovie)
router.put('/movies/:id', movieController.updateMovie)

module.exports = router