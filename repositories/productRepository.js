// /repositories/productRepository.js

const Product = require('../models/productModel');

const ProductRepository = {
  async getProducts() {
    return await Product.find();
  },

  async createProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  },

  async updateProduct(productId, productData) {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
  },

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  },
};

module.exports = ProductRepository;
