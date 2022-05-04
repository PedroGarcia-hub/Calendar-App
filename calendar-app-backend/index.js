const express = require('express');
require('dotenv').config();

// Server
const app = express();

// public directory
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));

// Serve launch
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
