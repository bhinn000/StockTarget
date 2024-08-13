const mongoose = require('mongoose');

const stockTargetSchema = new mongoose.Schema({
  scriptName: { type: String, required: true },
  targetValue: { type: Number, required: true },
});

const StockTarget = mongoose.model('StockTarget', stockTargetSchema);

module.exports = StockTarget;
