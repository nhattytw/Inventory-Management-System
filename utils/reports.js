const Product = require('../model/ProductModel');
const StockMovement = require('../model/StockModel');

exports.getInventoryReport = async () => {
      try {
            const products = await Product.find();
            const reportData = products.map((product) => ({
                  name: product.name,
                  description: product.description,
                  quantity: product.quantity,
                  price: product.price,
            }));
            return reportData;
      } catch (error) {
            throw error; 
      }
};

exports.getSalesReport = async (startDate, endDate) => {
      try {
            const movements = await StockMovement.find({
                  type: 'sale',
                  createdAt: { $gte: startDate, $lte: endDate },
            }).populate('product');
            const reportData = movements.map((movement) => ({
                  productName: movement.product.name,
                  quantity: movement.quantity,
                  price: movement.product.price,
                  total: movement.quantity * movement.product.price,
                  date: movement.createdAt,
            }));
            return reportData;
      } catch (error) {
            throw error; 
      }
};

exports.getPurchaseReport = async (startDate, endDate) => {
      try {
            const movements = await StockMovement.find({
                  type: 'purchase',
                  createdAt: { $gte: startDate, $lte: endDate },
            }).populate('product');
            const reportData = movements.map((movement) => ({
                  productName: movement.product.name,
                  quantity: movement.quantity,
                  price: movement.price,
                  total: movement.quantity * movement.price,
                  date: movement.createdAt,
            }));
            return reportData;
      } catch (error) {
            throw error; 
      }
};
