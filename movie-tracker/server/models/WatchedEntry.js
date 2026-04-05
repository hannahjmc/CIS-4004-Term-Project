import mongoose from 'mongoose';

const watchedEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    watchedDate: { type: Date, default: Date.now },
    userRating: { type: Number, min: 1, max: 5 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

watchedEntrySchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model('WatchedEntry', watchedEntrySchema);
