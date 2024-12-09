import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    description: { type: String },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    address: {
        province: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        subdistrict: { type: String, required: true },
        postalCode: { type: Number }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

shopSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Shop', shopSchema);