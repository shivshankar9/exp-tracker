const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Comment this line temporarily to isolate the DB issue

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
});

// Uncomment when testing with database
// connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
