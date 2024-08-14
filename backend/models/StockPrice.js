const mongoose = require('mongoose');

const stockPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  close: { type: Number, required: true },
  date: { type: Date, default: Date.now } // To record when the data was added
});

const StockPrice = mongoose.model('StockPrice', stockPriceSchema);

module.exports = StockPrice;
