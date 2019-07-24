const router = require('express').Router()
const movieController = require('../controllers/movie')

router.get('/',movieController.findAll)
router.get('/:id',movieController.findOneMovie)
router.post('/',movieController.createMovie)
router.delete('/:id', movieController.deleteMovie)
router.put('/:id', movieController.updateMovie)

module.exports = router