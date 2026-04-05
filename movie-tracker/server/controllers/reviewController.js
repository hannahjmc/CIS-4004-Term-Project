import Review from '../models/Review.js';

export const getAllReviews = async (_req, res) => {
  const reviews = await Review.find().populate('user', 'username').populate('movie', 'title').sort({ createdAt: -1 });
  res.json(reviews);
};

export const getReviewsForMovie = async (req, res) => {
  const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'username').sort({ createdAt: -1 });
  res.json(reviews);
};

export const createReview = async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id });
  const populated = await review.populate('user', 'username');
  res.status(201).json(populated);
};

export const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (req.user.role !== 'admin' && review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only update your own review' });
  }

  review.rating = req.body.rating ?? review.rating;
  review.comment = req.body.comment ?? review.comment;
  await review.save();

  const populated = await review.populate('user', 'username');
  res.json(populated);
};

export const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: 'Review not found' });

  if (req.user.role !== 'admin' && review.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only delete your own review' });
  }

  await review.deleteOne();
  res.json({ message: 'Review deleted' });
};
