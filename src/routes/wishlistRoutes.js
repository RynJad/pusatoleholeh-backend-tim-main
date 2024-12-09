import express from 'express';
import { addToWishlist, removeFromWishlist, getWishlist } from '../controllers/wishlistController.js';

const router = express.Router();
router.post('/add', addToWishlist);
router.delete('/remove/:userId/:productId', removeFromWishlist);
router.get('/:userId', getWishlist);

export default router;
