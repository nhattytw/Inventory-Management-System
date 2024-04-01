const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
      productId: {
            type: String,
            default: () => {
                  const randomUuid = uuidv4().replace(/-/g, ''); // Remove hyphens
                  return randomUuid.substring(0, 8); // Take the first 8 characters
            },
            required: true,
            unique: true,
      },
      name: {
            type: String,
            required: true,
      },
      description: {
            type: String,
      },
      quantity: {
            type: Number,
            default: 0,
      },
      price: {
            type: Number,
            required: true,
      },
      category: {
            type: String,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      updatedAt: {
            type: Date,
            default: Date.now,
      },
});

productSchema.pre('save', function (next) {
      this.updatedAt = Date.now();
      next();
});

module.exports = mongoose.model('Product', productSchema);