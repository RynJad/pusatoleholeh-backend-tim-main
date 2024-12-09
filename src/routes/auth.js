import express from 'express';
import passport from 'passport';
import { registerUser, registerSeller, registerAdmin, loginUser, googleCallback } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/register/seller', registerSeller);
router.post('/register/admin', registerAdmin);
router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);

export default router;
