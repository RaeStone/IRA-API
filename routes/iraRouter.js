const iraController = require ('../controllers/iraController');

const router = require('express').Router();

router.post('/', iraController.addIra);

router.put('/:id', iraController.updateIraTotal);

router.get('/', iraController.getAllIras);

router.get('/full', iraController.getAllIrasFull);

router.get('/full/:id', iraController.getIraFull);

router.get('/:id', iraController.getOneIra);

router.delete('/:id', iraController.deleteIra);

module.exports = router;