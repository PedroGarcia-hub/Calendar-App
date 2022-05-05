const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Server
const app = express();

// Database
dbConnection();

// public directory
app.use(express.static('public'));

// lecture and parse body
app.use(express.json());

// auth routes
app.use('/api/auth', require('./routes/auth'));

// Serve launch
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
