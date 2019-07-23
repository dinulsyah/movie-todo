const router = require('express').Router()
const tvController = require('../controllers/tv')

router.get('/tv',tvController.findAll)
router.get('/tv/:id',tvController.findOneTv)
router.post('/tv',tvController.createTv)
router.delete('/tv/:id', tvController.deleteTv)
router.put('/tv/:id', tvController.updateTv)

module.exports = router