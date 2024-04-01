const express = require('express');
const reportsController = require('../controller/reportController');
const router = express.Router();

router.get(
      '/inventory',
      reportsController.getInventoryReport
);
router.get(
      '/sales',
      reportsController.getSalesReport
);
router.get(
      '/purchases',
      reportsController.getPurchaseReport
);

module.exports = router;
