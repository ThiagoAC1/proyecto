const prisma = require('../utils/prisma');

exports.processPayment = async (orderId, userId) => {

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true }
  });

  if (!order)
    throw new Error("Order not found");

  if (order.userId !== userId)
    throw new Error("Unauthorized payment attempt");

  if (order.status !== "PENDING")
    throw new Error("Invalid order state");

  const paymentSuccess = Math.random() > 0.2;

  if (!paymentSuccess) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "FAILED" }
    });
    return { status: "FAILED" };
  }

  await prisma.$transaction(async (tx) => {

    // 🔎 Validar y descontar stock
    for (const item of order.items) {

      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (!product)
        throw new Error("Product not found");

      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for ${product.name}`);

      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity }
        }
      });
    }

    // ✅ Marcar orden como pagada
    await tx.order.update({
      where: { id: orderId },
      data: {
        status: "PAID",
        paymentId: "SIM_" + Date.now()
      }
    });

    // 🔥 Limpiar carrito del usuario
    const cart = await tx.cart.findUnique({
      where: { userId: userId }
    });

    if (cart) {
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });
    }

  });

  return { status: "PAID" };
};