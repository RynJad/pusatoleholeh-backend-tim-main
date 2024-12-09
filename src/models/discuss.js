import mongoose from 'mongoose';

const discussSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    replyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Discuss', default: null },
    chat: { type: String, required: true },
    deleted: {type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Discuss', discussSchema);