const Worker = require('../models/workerModel');
const User = require('../models/userModels');
const generateToken = require('../utils/generateToken');

const getWorkers = async (req, res) => {
  try {
    console.log('getWorkers API called');
    console.log('Query params:', req.query);
    
    const { profession, location, minCharges, maxCharges, search } = req.query;
    
    let query = {};
    
    if (profession) {
      query.profession = { $regex: profession, $options: 'i' };
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (minCharges || maxCharges) {
      query.charges = {};
      if (minCharges) query.charges.$gte = Number(minCharges);
      if (maxCharges) query.charges.$lte = Number(maxCharges);
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { profession: { $regex: search, $options: 'i' } }
      ];
    }
    
    console.log('MongoDB query:', query);
    const workers = await Worker.find(query).select('-createdAt -updatedAt -__v');
    console.log(`Found ${workers.length} workers`);
    
    res.json(workers);
  } catch (error) {
    console.error('Error in getWorkers:', error);
    res.status(500).json({ message: error.message });
  }
};

const createWorker = async (req, res) => {
  try {
    const { name, profession, location, charges, contact } = req.body;
    const worker = new Worker({ name, profession, location, charges, contact });
    const savedWorker = await worker.save();
    res.status(201).json(savedWorker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const workerSignup = async (req, res) => {
  try {
    const { name, email, password, profession, location, charges, contact } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    const newUser = new User({ name, email, password, role: 'worker' });
    const savedUser = await newUser.save();
    
    const worker = new Worker({ name, profession, location, charges, contact });
    await worker.save();
    
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      token: generateToken(savedUser._id),
      workerProfile: {
        profession,
        location,
        charges,
        contact
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getWorkers,
  createWorker,
  workerSignup
};