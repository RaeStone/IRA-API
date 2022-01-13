const transactionController = require('../controllers/transactionController');

const router = require('express').Router();

router.post('/', transactionController.addTransaction);

router.get('/', transactionController.getAllTransactions);

router.get('/:id', transactionController.getOneTransaction);

router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;