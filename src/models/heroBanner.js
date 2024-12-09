import mongoose from 'mongoose';

const heroBannerSchema = new mongoose.Schema({
  path: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('HeroBanner', heroBannerSchema);
