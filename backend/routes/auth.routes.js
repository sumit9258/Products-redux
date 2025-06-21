import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

//http://locahost:3000/api/user/register
router.post('/register', register);
//http://locahost:3000/api/user/login
router.post('/login', login);
//http://locahost:3000/api/user/profile
router.get('/profile', authMiddleware, getProfile);


export default router;