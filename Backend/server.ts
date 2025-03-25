import express, { Express, Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from "dotenv";
import connectDB from "./config/db";

// Routes
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from './routes/cartRoutes'
import reviewRoutes from './routes/reviewRoutes'
import orderRoutes from './routes/orderRoutes'
import paymentRoutes from './routes/paymentRoutes'

const PORT = process.env.PORT || 4000;
const app: Express = express();

const corsOptions = {
  origin: "https://localhost:5173",
  methods: "GET,POST",
  credentials: true,
};

// Middlewares to accept json in body
app.use(cors(corsOptions));
app.use(express.json());

// Morgan logging
app.use(morgan("dev"));
dotenv.config();

connectDB();
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API IS RUNNING...");
});

// Use routes
app.use("/api/products/", productRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/products/", reviewRoutes)
app.use("/api/orders/", orderRoutes)
app.use(paymentRoutes)

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});