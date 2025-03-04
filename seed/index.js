const mongoose = require('mongoose');
const seedEvents = require('./seedEvents');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ygen');
    console.log('Connected to MongoDB');

    // Run seeds
    await seedEvents();
    console.log('Database seeding completed');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 