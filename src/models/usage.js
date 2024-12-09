import mongoose from 'mongoose';

const usageSchema = new mongoose.Schema({
    endpoint: { type: String, required: true, unique: true },
    productId: { type: String, required: true, unique: true},
    count: { type: Number, default: 1 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Usage', usageSchema);