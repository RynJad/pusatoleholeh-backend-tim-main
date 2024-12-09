import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Shop from '../models/shop.js';

export const safeRoute = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];        
    }
    if (!token) return res.status(401).json({message: "minggir lu miskin, lu gaada token"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Invalid token, user not found.' });
        }

        next();
    } catch (err) {
        res.status(401).json({ message: 'token lu ga valid kocag!'});
    }
};

export const verifyRole = (...allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'invalid role' });
    }
    next();
};

export const checkShop = async (req, res, next) => {
    try {
        const shop = await Shop.findOne({ ownerId: req.user._id });

        if (!shop) {
            return res.status(404).json({ message: 'Shop not found for this user.' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const checkShopOwner = async (req, res, next) => {
    const { shopId } = req.params;

    try {
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found.' });
        }

        if (String(shop.ownerId) !== String(req.user._id)) {
            return res.status(403).json({ message: 'You do not have permission to modify this shop.' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const checkUserOrigin = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Invalid User.' });
        }

        if (String(user._id) !== String(req.user._id)) {
            return res.status(403).json({ message: 'You do not have enough permission' });
        }

        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

