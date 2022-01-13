const iraController = require ('../controllers/iraController');

const router = require('express').Router();

router.post('/', iraController.addIra);

router.get('/', iraController.getAllIras);

router.get('/:id', iraController.getOneIra);

// router.get('/full', iraController.getAllIrasFull);

router.get('/full/:id', iraController.getIraFull);

router.delete('/:id', iraController.deleteIra);

module.exports = router;