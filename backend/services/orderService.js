exports.createOrder = async (userId) => {

  return await prisma.$transaction(async (tx) => {

    const cart = await tx.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0)
      throw new Error("Cart is empty");

    let total = 0;

    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`);
      }
      total += item.product.price * item.quantity;
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    });

    const existingOrder = await tx.order.findFirst({
  where: {
    userId,
    status: "PENDING"
  }
});

if (existingOrder)
  throw new Error("You already have a pending order");

    return order;
  });

};