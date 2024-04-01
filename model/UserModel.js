const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
      username: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      role: {
            type: String,
            enum: ['admin', 'manager', 'employee'],
            default: 'employee'
      }
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
      const user = this;
      if (user.isModified('password')) {
            user.password = await bcryptjs.hash(user.password, 10);
      }
      next();
});


module.exports = mongoose.model('User', userSchema);