// controllers/wishlist.js
import Wishlist from '../models/wishlist.js';
import Product from '../models/product.js';

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Cari wishlist pengguna
    let wishlist = await Wishlist.findOne({ userId });

    // Jika wishlist belum ada, buat yang baru
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Cek apakah produk sudah ada di wishlist
    const itemExists = wishlist.items.some(item => item.productId.toString() === productId);
    if (itemExists) {
      return res.status(400).json({ message: 'Product already in the wishlist' });
    }

    // Tambahkan produk ke wishlist
    wishlist.items.push({ productId });
    wishlist.updatedAt = Date.now();

    await wishlist.save();

    return res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Hapus produk dari wishlist
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    wishlist.updatedAt = Date.now();

    await wishlist.save();

    return res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    // Ambil wishlist berdasarkan userId
    const wishlist = await Wishlist.findOne({ userId }).populate('items.productId', 'name price');
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    return res.status(200).json({ wishlist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
