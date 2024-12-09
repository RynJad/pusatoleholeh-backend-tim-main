// routes/wishlist.js
import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';
import { safeRoute, verifyRole } from '../middlewares/middleware.js';

const router = express.Router();

// Buyer routes
router.post('/add', safeRoute, verifyRole('buyer'), addToWishlist);
router.delete('/remove/:userId/:productId', safeRoute, verifyRole('buyer'), removeFromWishlist);
router.get('/:userId', safeRoute, verifyRole('buyer'), getWishlist);

export default router;
