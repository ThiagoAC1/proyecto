const orderService = require('../services/orderService');
const paymentService = require('../services/paymentService');


// =====================
// CREATE ORDER
// =====================
exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.id);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


// =====================
// PAY ORDER
// =====================
exports.payOrder = async (req, res, next) => {
  try {
    const orderId = parseInt(req.params.id);

    if (!orderId) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const result = await paymentService.processPayment(
      orderId,
      req.user.id   // 🔥 PASAMOS EL USER ID
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
};
