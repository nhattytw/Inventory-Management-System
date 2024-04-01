const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/userController');

// @route    POST api/register
// @desc     Register user
// @access   Private
router.post(
      '/register',
      register
);

router.post(
      '/login',
      login
);


module.exports = router;