const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const { getWorkers, createWorker, workerSignup } = require('../controllers/workerController');

router.get('/', getWorkers);
router.get('/:id', async (req, res) => {
  try {
    const Worker = require('../models/workerModel');
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }
    res.json(worker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', createWorker);
router.post('/signup', workerSignup);
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = require('../models/userModels');
    
    const user = await User.findOne({ email, role: 'worker' });
    if (!user) {
      return res.status(404).json({ message: "Worker not found" });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    
    const jwt = require('jsonwebtoken');
    const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', protect, checkRole(['worker']), (req, res) => {
  res.json({ message: 'Worker profile', user: req.user });
});

module.exports = router;