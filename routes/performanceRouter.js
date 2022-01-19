const performanceController = require('../controllers/performanceController');

const router = require('express').Router();

router.post('/', performanceController.addPerformance);

router.get('/', performanceController.getAllPerformances);

router.get('/ira/:id', performanceController.getPerformanceByIra);

router.get('/:id', performanceController.getOnePerformance);

router.delete('/:id', performanceController.deletePerformance);

module.exports = router;