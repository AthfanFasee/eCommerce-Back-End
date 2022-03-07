import express from 'express';
import {addLike, removeLike, deleteProduct, updateProduct, getAllProducts, createProduct} from '../controllers/products.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', upload.array('image', 3), createProduct);
router.patch('/:id', updateProduct);
router.patch('/like/:id', addLike);
router.patch('/dislike/:id', removeLike);
router.delete('/:id', deleteProduct);

export default router;