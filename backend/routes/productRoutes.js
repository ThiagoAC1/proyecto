const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');
const { createProductValidator } = require('../validators/productValidator');
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  createProductValidator,
  validateMiddleware,
  productController.createProduct
);

module.exports = router;