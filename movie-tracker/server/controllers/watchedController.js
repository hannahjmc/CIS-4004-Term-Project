import WatchedEntry from '../models/WatchedEntry.js';

export const getMyWatched = async (req, res) => {
  const entries = await WatchedEntry.find({ user: req.user._id }).populate('movie').sort({ createdAt: -1 });
  res.json(entries);
};

export const createWatchedEntry = async (req, res) => {
  try {
    const entry = await WatchedEntry.create({
      user: req.user._id,
      movie: req.body.movie,
      watchedDate: req.body.watchedDate,
      userRating: req.body.userRating,
      notes: req.body.notes,
    });
    const populated = await entry.populate('movie');
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'This movie is already marked as watched' });
  }
};

export const updateWatchedEntry = async (req, res) => {
  const entry = await WatchedEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  if (entry.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'You can only update your own watched entry' });
  }

  entry.watchedDate = req.body.watchedDate ?? entry.watchedDate;
  entry.userRating = req.body.userRating ?? entry.userRating;
  entry.notes = req.body.notes ?? entry.notes;
  await entry.save();
  const populated = await entry.populate('movie');
  res.json(populated);
};

export const deleteWatchedEntry = async (req, res) => {
  const entry = await WatchedEntry.findById(req.params.id);
  if (!entry) return res.status(404).json({ message: 'Entry not found' });
  if (entry.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not allowed to delete this entry' });
  }

  await entry.deleteOne();
  res.json({ message: 'Watched entry deleted' });
};
