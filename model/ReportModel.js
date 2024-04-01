const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
      type: {
            type: String,
            enum: ['inventory', 'sales', 'purchase'],
            required: true,
      },
      data: {
            type: Object,
            required: true,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
      },
});

module.exports = mongoose.model('Report', reportSchema);
