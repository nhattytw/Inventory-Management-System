const { getInventoryReport, getSalesReport, getPurchaseReport } = require('../utils/reports.js');
const Report = require('../model/InventoryModel');
const connectToDB = require('../dbConnect.js');

exports.getInventoryReport = async (req, res) => {
      try {
            connectToDB()
            const reportData = await getInventoryReport();
            
            const report = new Report({ type: 'inventory', data: reportData });
            await report.save();
            res.json(reportData);
      } catch (error) {
            console.error('Error fetching inventory report:', error);
            res.status(500).json({ message: 'Failed to generate report' });
      }
};

exports.getSalesReport = async (req, res) => {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate; 
      try {
            connectToDB()
            const reportData = await getSalesReport(startDate, endDate);
            
            const report = new Report({ type: 'sales', data: reportData });
            await report.save();
            res.json(reportData);
      } catch (error) {
            console.error('Error fetching sales report:', error);
            res.status(500).json({ message: 'Failed to generate report' });
      }
};

exports.getPurchaseReport = async (req, res) => {
      const startDate = req.query.startDate; 
      const endDate = req.query.endDate; 

      try {
            connectToDB()
            const reportData = await getPurchaseReport(startDate, endDate);
           
            const report = new Report({ type: 'purchase', data: reportData });
            await report.save();
            res.json(reportData);
      } catch (error) {
            console.error('Error fetching purchase report:', error);
            res.status(500).json({ message: 'Failed to generate report' });
      }
};
