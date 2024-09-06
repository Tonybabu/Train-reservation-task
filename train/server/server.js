const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seatRoutes = require('./routes/seatRoutes');

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', seatRoutes);

// Listen
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
