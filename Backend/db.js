const mongoose = require('mongoose');
const uri = `mongodb://0.0.0.0:27017/Product`;
// const uri = `mongodb://localhost:27017`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


module.exports = mongoose.connection

