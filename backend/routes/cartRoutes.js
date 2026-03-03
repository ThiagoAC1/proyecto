const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/', authMiddleware, cartController.getCart);

router.post('/add', authMiddleware, cartController.addToCart);

router.put('/update', authMiddleware, cartController.updateQuantity);

router.delete('/remove/:productId', authMiddleware, cartController.removeFromCart);

router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;