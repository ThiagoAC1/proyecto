const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/', authMiddleware, orderController.createOrder);

router.post('/:id/pay', authMiddleware, orderController.payOrder);

module.exports = router;