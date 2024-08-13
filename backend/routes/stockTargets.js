const express = require('express');
const router = express.Router();
const StockTarget = require('../models/StockTarget');

router.post('/add', async (req, res) => {
  try {
    const { scriptName, targetValue } = req.body;

    const newStockTarget = new StockTarget({
      scriptName,
      targetValue,
    });

    await newStockTarget.save();
    res.status(201).json(newStockTarget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
