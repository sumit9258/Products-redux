import express from "express";
import { 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  getCategory, 
  getAllCategories 
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/cloudinary.js";

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), createCategory);
router.put('/:id', authMiddleware, upload.single('image'), updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategories);

export default router;