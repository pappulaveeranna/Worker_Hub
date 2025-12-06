const mongoose = require('mongoose');
require('dotenv').config();
const Worker = require('./models/workerModel');

const sampleWorkers = [
  {
    name: "Rajesh Kumar",
    profession: "Plumber",
    location: "Delhi",
    charges: 300,
    contact: "9876543210"
  },
  {
    name: "Amit Singh",
    profession: "Electrician", 
    location: "Mumbai",
    charges: 400,
    contact: "9876543211"
  },
  {
    name: "Suresh Sharma",
    profession: "Carpenter",
    location: "Bangalore",
    charges: 350,
    contact: "9876543212"
  },
  {
    name: "Vikram Patel",
    profession: "AC Repair",
    location: "Pune",
    charges: 500,
    contact: "9876543213"
  },
  {
    name: "Ravi Gupta",
    profession: "Painter",
    location: "Chennai",
    charges: 250,
    contact: "9876543214"
  },
  {
    name: "Manoj Yadav",
    profession: "Cleaner",
    location: "Hyderabad",
    charges: 200,
    contact: "9876543215"
  }
];

const seedWorkers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing workers
    await Worker.deleteMany({});
    console.log('Cleared existing workers');
    
    // Insert sample workers
    const workers = await Worker.insertMany(sampleWorkers);
    console.log(`Added ${workers.length} sample workers`);
    
    console.log('Sample workers:');
    workers.forEach(worker => {
      console.log(`- ${worker.name} (${worker.profession}) - ₹${worker.charges}/hour - ${worker.location}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding workers:', error);
    process.exit(1);
  }
};

seedWorkers();