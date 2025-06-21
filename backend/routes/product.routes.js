import express from "express";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getProduct, 
  getAllProducts 
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/:id', getProduct);
router.get('/', getAllProducts);

export default router;