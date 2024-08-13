require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uri = process.env.mongouri;

const app = express();
app.use(bodyParser.json());

// MongoDB schema for stock prices
const stockPriceSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    close: { type: String, required: true }
});

const StockPrice = mongoose.model('StockPrice', stockPriceSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to receive stock prices
app.post('/update-stock-prices', async (req, res) => {
    try {
        const stockPrices = req.body;
        await StockPrice.insertMany(stockPrices);
        res.status(200).send('Stock prices updated successfully.');
    } catch (error) {
        console.error('Error updating stock prices:', error);
        res.status(500).send('Failed to update stock prices.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
