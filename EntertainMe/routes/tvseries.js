const router = require('express').Router()
const tvController = require('../controllers/tv')

router.get('/',tvController.findAll)
router.get('/:id',tvController.findOneTv)
router.post('/',tvController.createTv)
router.delete('/:id', tvController.deleteTv)
router.put('/:id', tvController.updateTv)

module.exports = router