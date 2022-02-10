const iraController = require ('../controllers/iraController');
const authController = require ('../controllers/authController');

const router = require('express').Router();

router.post('/', iraController.addIra);

router.put('/', iraController.updateIraUser);

router.put('/:id', authController.checkUser, iraController.updateIraTotal);

router.get('/', iraController.getAllIras);

router.get('/secret/:id', iraController.getFull);

router.get('/full', iraController.getAllIrasFull);

router.get('/full/:id', iraController.getIraFull);

router.get('/:id', authController.checkUser, iraController.getOneIra);

router.delete('/:id', iraController.deleteIra);

module.exports = router;