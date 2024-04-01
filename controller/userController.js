const User = require('../model/UserModel');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const connectToDB = require('../dbConnect.js');

// Register user
const register = async (req, res) => {
      try {
            connectToDB()
            const newUser = new User(req.body);
            await newUser.save();
            const token = jwt.sign(
                  { _id: newUser._id },
                  process.env.JWT_SECRET
            );
            res.status(201).json({ message: 'User created successfully', token });
      } catch (error) {
            res.status(400).json({ message: error.message });
      }
}

// Login user
const login = async (req, res) => {
      try {
            connectToDB()
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            const role = user.role;

            if (!user) {
                  return res.status(401).json({ message: 'Invalid username or password' });
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                  return res.status(401).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.json({ message: 'Login successful', token, role });
      } catch (error) {
            res.status(500).json({ message: error.message });
      }
};

module.exports = { register, login }