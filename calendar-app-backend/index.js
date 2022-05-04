const express = require('express');
require('dotenv').config();

// Server
const app = express();

// public directory
app.use(express.static('public'));

// Rutas
// app.get('/', (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

// Serve launch
app.listen(process.env.PORT, () => {
  console.log(`Server on port ${process.env.PORT}`);
});
