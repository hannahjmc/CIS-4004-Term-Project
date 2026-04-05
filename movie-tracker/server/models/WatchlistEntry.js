import mongoose from 'mongoose';

const watchlistEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  { timestamps: true }
);

watchlistEntrySchema.index({ user: 1, movie: 1 }, { unique: true });

export default mongoose.model('WatchlistEntry', watchlistEntrySchema);
