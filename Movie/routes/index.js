const router = require('express').Router()
const movieController = require('../controllers/movie')

router.get('/movies',movieController.findAll)
router.get('/movies/:id',movieController.findOneMovie)
router.post('/movies',movieController.createMovie)
router.delete('/movies/:id', movieController.deleteMovie)
router.put('/movies/:id', movieController.updateMovie)

module.exports = router