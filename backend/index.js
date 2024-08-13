const express = require('express');
const mongoose = require('mongoose');
const stockTargetsRouter = require('./routes/stockTargets'); 

const app = express();
const PORT = 8085; 
const uri = process.env.mongouri;

// Middleware
app.use(express.json()); // To parse JSON request bodies

// Use the routes
app.use('/api/stockTargets', stockTargetsRouter);

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Stock Target API');
  });


