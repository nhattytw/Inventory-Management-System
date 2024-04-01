const Product = require('../model/ProductModel');
const User = require('../model/UserModel');
const connectToDB = require('../dbConnect.js');

exports.createProduct = async (req, res) => {
      try {
            connectToDB()
            const { username } = req.body;
            const user = await User.findOne({ username });
            const role = user.role;

            if (!['admin', 'manager'].includes(role)) {
                  return res.status(403).json({ message: 'Forbidden: Unauthorized access' });
            }
            const newProduct = new Product(req.body);
            await newProduct.save();
            res.status(201).json(newProduct);
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};

exports.getProducts = async (req, res) => {
      try {
            connectToDB()
            const products = await Product.find({});
            res.json(products);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

exports.getProduct = async (req, res) => {
      try {
            connectToDB()
            const productId = req.params.productId;
            const product = await Product.findOne({ productId });

            if (!product) {
                  return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

exports.updateProduct = async (req, res) => {
      try {
            connectToDB()
            const { username } = req.body;
            const user = await User.findOne({ username });
            const role = user.role;

            if (!['admin', 'manager'].includes(role)) {
                  return res.status(403).json({ message: 'Forbidden: Unauthorized access' });
            }
            const productId = req.params.productId;
            const updates = req.body;
            const options = { new: true };
            const updatedProduct = await Product.findOneAndUpdate({ productId }, updates, options);
            if (!updatedProduct) {
                  return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};

exports.deleteProduct = async (req, res) => {
      try {
            connectToDB()
            const { username } = req.body;
            const user = await User.findOne({ username });
            const role = user.role;

            if (!['admin'].includes(role)) {
                  return res.status(403).json({ message: 'Forbidden: Unauthorized access' });
            }
            const productId = req.params.productId;
            const product = await Product.findOneAndDelete({ productId });
            if (!product) {
                  return res.status(404).json({ message: 'Product not found' });
            }
            res.json({ message: 'Product deleted' });
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};
