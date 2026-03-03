const prisma = require('../utils/prisma');

// =====================
// GET CART
// =====================
exports.getCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Calcular total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    res.json({
      ...cart,
      total
    });

  } catch (error) {
    next(error);
  }
};

// =====================
// ADD TO CART
// =====================
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id }
    });

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId)
      }
    });

    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;

    if (product.stock < newQuantity) {
      return res.status(400).json({ message: "Stock insufficient" });
    }

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: Number(productId),
          quantity
        }
      });
    }

    res.json({ message: "Product added to cart" });

  } catch (error) {
    next(error);
  }
};

// =====================
// UPDATE QUANTITY
// =====================
exports.updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id }
    });

    const item = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(productId)
      }
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) }
    });

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Stock insufficient" });
    }

    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity }
    });

    res.json({ message: "Quantity updated" });

  } catch (error) {
    next(error);
  }
};

// =====================
// REMOVE FROM CART
// =====================
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId: Number(productId)
      }
    });

    res.json({ message: "Product removed from cart" });

  } catch (error) {
    next(error);
  }
};

// =====================
// CLEAR CART
// =====================
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user.id }
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    res.json({ message: "Cart cleared" });

  } catch (error) {
    next(error);
  }
};