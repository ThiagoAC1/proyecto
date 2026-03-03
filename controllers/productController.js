const prisma = require('../utils/prisma');

exports.getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || price <= 0 || stock < 0) {
      return res.status(400).json({
        message: "Invalid product data"
      });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock }
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};