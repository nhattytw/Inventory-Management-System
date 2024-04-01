const express = require('express');
const router = express.Router();
const {
      createProduct,
      getProducts,
      getProduct,
      updateProduct,
      deleteProduct,
} = require('../controller/productController');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

module.exports = router;