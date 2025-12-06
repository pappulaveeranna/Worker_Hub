const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createReview, getWorkerReviews, getAllReviews } = require('../controllers/reviewController');

router.post('/', protect, createReview);

router.get('/worker/:workerId', getWorkerReviews);

router.get('/', getAllReviews);

module.exports = router;