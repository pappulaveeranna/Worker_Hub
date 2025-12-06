const Booking = require('../models/bookingModel');

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('worker', 'name profession contact');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { worker, service, date, time, address, totalAmount } = req.body;
    const booking = new Booking({
      user: req.user._id,
      worker,
      service,
      date,
      time,
      address,
      totalAmount
    });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    console.log('getUserBookings called for user:', req.user._id);
    const bookings = await Booking.find({ user: req.user._id })
      .populate('worker', 'name profession contact');
    
    // Check for existing reviews for each booking
    const Review = require('../models/reviewModel');
    const bookingsWithReviews = await Promise.all(
      bookings.map(async (booking) => {
        const review = await Review.findOne({ booking: booking._id });
        return {
          ...booking.toObject(),
          reviewId: review ? review._id : null
        };
      })
    );
    
    console.log('Found bookings:', bookingsWithReviews.length);
    res.json(bookingsWithReviews);
  } catch (error) {
    console.error('Error in getUserBookings:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (req.user.role !== 'worker' && req.user.role !== 'admin' && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }
    
    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBookings,
  createBooking,
  getUserBookings,
  updateBookingStatus
};