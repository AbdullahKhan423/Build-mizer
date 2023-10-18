import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './Routes/AuthRoute.js';
import projectRoute from './Routes/ProjectRoute.js';
const app = express();
dotenv.config();
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas (replace with your MongoDB Atlas connection string)
mongoose.connect(process.env.YOUR_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define your routes here

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servers is running on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

app.use("/projects", projectRoute);
