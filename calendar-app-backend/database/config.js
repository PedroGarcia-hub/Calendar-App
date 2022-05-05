const mongoose = require('mongoose');

const dbConnection = async () => {
  mongoose.connect(process.env.DB_CNN);
  console.log('Connected to DB');
  try {
  } catch (error) {
    console.error(error);
    throw new Error('Can not connect DB');
  }
};

module.exports = {
  dbConnection,
};
