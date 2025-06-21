import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRoute from "./routes/auth.routes.js"
import productRoute from "./routes/product.routes.js";
import categoryRoute from "./routes/category.routes.js";
import connectDB from "./utils/db.js";
import { v2 as cloudinary } from 'cloudinary';
const app = express();
configDotenv();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



app.use(express.json());
connectDB();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get("/", (req, res) => {
  console.log("GET request received");
  res.json({ "hello js": "try new" });
});

//http://localhost:3000/api/user
app.use("/api/user", userRoute);
//http://localhost:3000/api/product
app.use("/api/product", productRoute);
//http://localhost:3000/api/category
app.use("/api/category", categoryRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});