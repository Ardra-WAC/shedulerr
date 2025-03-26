import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const app = express();

// app.use(cors());

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';  // Set your frontend URL for Vercel or development

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // If no origin (for server-to-server requests or requests without origin), allow it
    if (!origin || origin === allowedOrigin) {
      callback(null, true);  // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS'));  // Reject the origin
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import employeeRoutes from "./routes/EmployeeRoutes.js"; 
import eventRoutes from "./routes/events.js";

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);

const connectToDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect("mongodb+srv://ardrawac:wOKSKRcDz7B2XvDZ@mycluster.k2c3q.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster");
=======
    const dburi=process.env.mongoDb
    await mongoose.connect(dburi);
>>>>>>> 89a73f19ffc3a0c37986029b8472998937cdd126
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