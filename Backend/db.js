const mongoose = require('mongoose');
const uri = `mongodb+srv://admin:admin@cluster1.nzinwdy.mongodb.net/Product`



mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    // Event handler for when the connection is closed
    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB Atlas');
    });

    // Event handler for connection errors
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB Atlas connection error:', err);
    });

    // Graceful shutdown - listen for SIGINT and SIGTERM signals
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('MongoDB Atlas connection closed through app termination');
        process.exit(0);
      });
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = mongoose.connection;
