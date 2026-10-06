const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');

dotenv.config();

const seedData = [
  {
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    department: 'Engineering',
    designation: 'Software Engineer',
  },
  {
    name: 'Priya Kumar',
    email: 'priya@example.com',
    department: 'Human Resources',
    designation: 'HR Executive',
  },
  {
    name: 'Arjun Rao',
    email: 'arjun@example.com',
    department: 'Finance',
    designation: 'Financial Analyst',
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not defined. Please set it in your .env file.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding.');

    // Clear existing data
    await Employee.deleteMany({});
    console.log('Existing employees cleared.');

    // Insert seed data
    const employees = await Employee.insertMany(seedData);
    console.log(`${employees.length} employees seeded successfully.`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
