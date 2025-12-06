const Review = require('../models/reviewModel');
const Booking = require('../models/bookingModel');

const createReview = async (req, res) => {
  try {
    console.log('Creating review for booking:', req.body.booking);
    const { worker, booking, rating, comment } = req.body;
    
    const bookingDoc = await Booking.findById(booking);
    if (!bookingDoc) {
      console.log('Booking not found:', booking);
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (bookingDoc.status !== 'completed') {
      console.log('Booking not completed:', bookingDoc.status);
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }
    
    if (bookingDoc.user.toString() !== req.user._id.toString()) {
      console.log('User not authorized for this booking');
      return res.status(403).json({ message: 'Can only review your own bookings' });
    }
    
    const existingReview = await Review.findOne({ booking });
    if (existingReview) {
      console.log('Review already exists for booking:', booking);
      return res.status(400).json({ message: 'Review already exists for this booking' });
    }
    
    const review = new Review({
      user: req.user._id,
      worker,
      booking,
      rating,
      comment
    });
    
    const savedReview = await review.save();
    console.log('Review created successfully:', savedReview._id);
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(400).json({ message: error.message });
  }
};

const getWorkerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ worker: req.params.workerId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name')
      .populate('worker', 'name profession')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getWorkerReviews,
  getAllReviews
};