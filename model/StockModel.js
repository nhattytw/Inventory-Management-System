const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
      product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
      },
      type: {
            type: String,
            enum: ['purchase', 'sale', 'return', 'adjustment'],
            required: true,
      },
      quantity: {
            type: Number,
            required: true,
      },
      price: {
            type: Number,
            required: true,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
});

module.exports = mongoose.model('StockMovement', stockMovementSchema);
