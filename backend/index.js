require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const stockTargetsRouter = require('./routes/stockTargets'); 
const StockTarget = require('./models/StockTarget');
const StockPrice = require('./models/StockPrice');


const app = express();
const PORT = 8085; 
const uri = process.env.mongouri;
console.log(uri)

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Use the routes
app.use('/api/stockTargets', stockTargetsRouter);

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Stock Target API');
  });


  async function checkTargets() {
    try {
        const targets = await StockTarget.find();
        console.log('Targets:', targets); // Log targets to ensure they are retrieved

        for (let target of targets) {
            const priceRecord = await StockPrice.findOne({ symbol: target.scriptName }).sort({ date: -1 });
            console.log('Price Record:', priceRecord); // Log priceRecord to ensure it is retrieved
            
            if (priceRecord && priceRecord.close === target.targetValue) {
                console.log('I am here');
                // Optionally, send a notification here
            }
        }
    } catch (error) {
        console.error('Error checking targets:', error);
    }
}

  // Call this function after updating stock prices or at regular intervals
  checkTargets();



