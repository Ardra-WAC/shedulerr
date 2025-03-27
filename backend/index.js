import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGIN, "http://localhost:5173", "https://calendarapp-mocha.vercel.app"];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import employeeRoutes from "./routes/EmployeeRoutes.js"; 
import eventRoutes from "./routes/events.js";

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);

const connectToDB = async () => {
  try {
    const dburi=process.env.mongoDb
    await mongoose.connect(dburi);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectToDB();

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
  console.log(`Server started successfully on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Server is running");
});