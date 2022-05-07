const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static('public'));

// lecture and parse body
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Serve launch
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
