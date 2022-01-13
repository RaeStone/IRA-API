const investmentController = require('../controllers/investmentController');

const router = require('express').Router();

router.post('/', investmentController.addInvestment);

router.get('/', investmentController.getAllInvestments);

router.get('/:id', investmentController.getOneInvestment);

router.delete('/:id', investmentController.deleteInvestment);

module.exports = router;