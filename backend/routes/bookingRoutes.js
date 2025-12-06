const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getBookings, createBooking, getUserBookings, updateBookingStatus } = require('../controllers/bookingController');

router.get('/', protect, getUserBookings);

router.post('/', protect, createBooking);

router.put('/:id/status', protect, updateBookingStatus);

router.get('/all', protect, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}, getBookings);

module.exports = router;