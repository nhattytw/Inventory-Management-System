const StockMovement = require('../model/StockModel');
const Product = require('../model/ProductModel');
const connectToDB = require('../dbConnect.js');

exports.addStockMovement = async (req, res) => {
      try {
            connectToDB()
            const productId = req.params.productId;
            const { type, quantity, price } = req.body;

            const product = await Product.findOne({productId});
            if (!product) {
                  return res.status(404).json({ message: 'Product not found' });
            }

            const newMovement = new StockMovement({
                  product,
                  type,
                  quantity,
                  price: type === 'purchase' ? price : product.price, 
            });

            await newMovement.save();

            // Update product quantity based on movement type
            let update;
            switch (type) {
                  case 'purchase':
                  case 'return':
                        update = { price: price, $inc: { quantity: quantity } };
                        break;
                  case 'sale':
                  case 'adjustment':
                        update = { $inc: { quantity: -quantity } };
                        break;
            }
            await Product.findOneAndUpdate({productId}, update);

            res.status(201).json(newMovement);
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
};
