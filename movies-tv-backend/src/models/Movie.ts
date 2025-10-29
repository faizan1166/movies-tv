import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  type: 'Movie' | 'TV Show';
  director?: string;
  budget?: string;
  location?: string;
  duration?: string;
  yearOrTime?: string;
  description?: string;
  posterUrl?: string;
  createdAt?: Date;
}

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['Movie', 'TV Show'], required: true },
  director: { type: String },
  budget: { type: String },
  location: { type: String },
  duration: { type: String },
  yearOrTime: { type: String },
  description: { type: String },
  posterUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
