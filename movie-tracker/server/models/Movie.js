import mongoose from 'mongoose';

/*
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    genre: { type: String, default: '' },
    director: { type: String, default: '' },
    releaseYear: { type: Number, required: true },
    posterUrl: { type: String, default: '' },
  },
  { timestamps: true }
);
*/

const movieSchema = new mongoose.Schema(
{
title: { type: String, required: true, unique: true },
description: { type: String, required: true },
releaseYear: { type: Number, required: true },
genre: { type: String, required: true },
director: { type: String, required: true },
posterUrl: { type: String, default: "" }
},
{ timestamps: true }
);


export default mongoose.model('Movie', movieSchema);
