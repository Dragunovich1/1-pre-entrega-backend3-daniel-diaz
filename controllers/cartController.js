// /controllers/cartController.js

const CartRepository = require('../repositories/cartRepository');
const ProductRepository = require('../repositories/productRepository');
const Ticket = require('../models/ticketModel');

exports.completePurchase = async (req, res) => {
  const cartId = req.params.cid;
  const user = req.session.user;

  try {
    const cart = await CartRepository.getCartById(cartId);
    let totalAmount = 0;
    let failedProducts = [];

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product._id);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
      } else {
        failedProducts.push(product._id);
      }
    }

    if (totalAmount > 0) {
      const ticket = new Ticket({
        amount: totalAmount,
        purchaser: user.email,
      });
      await ticket.save();
    }

    cart.products = cart.products.filter((item) =>
      failedProducts.includes(item.product._id)
    );
    await cart.save();

    res.json({
      message: 'Compra completada',
      failedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al completar la compra', error });
  }
};
