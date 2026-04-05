import WatchlistEntry from '../models/WatchlistEntry.js';

export const getMyWatchlist = async (req, res) => {
  const entries = await WatchlistEntry.find({ user: req.user._id }).populate('movie').sort({ createdAt: -1 });
  res.json(entries);
};

export const createWatchlistEntry = async (req, res) => {
  try {
    const entry = await WatchlistEntry.create({
      user: req.user._id,
      movie: req.body.movie,
      priority: req.body.priority,
    });
    const populated = await entry.populate('movie');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'This movie is already in your watchlist' });
  }
};

export const updateWatchlistEntry = async (req, res) => {
  const entry = await WatchlistEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  if (entry.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only update your own watchlist entry' });
  }

  entry.priority = req.body.priority ?? entry.priority;
  await entry.save();
  const populated = await entry.populate('movie');
  res.json(populated);
};

export const deleteWatchlistEntry = async (req, res) => {
  const entry = await WatchlistEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  if (entry.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed to delete this entry' });
  }

  await entry.deleteOne();
  res.json({ message: 'Watchlist entry deleted' });
};
