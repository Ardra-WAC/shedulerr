import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS Configuration: Allow only specific origins (e.g., your front-end)
const allowedOrigins = [process.env.ALLOWED_ORIGIN, "https://calendarappfrnt.vercel.app", "http://localhost:5173"];
console.log("Allowed Origins", allowedOrigins);

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options('*', (req, res) => {
  console.log("Preflight request received from:", req.headers.origin);
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import employeeRoutes from "../routes/EmployeeRoutes.js"; 
import eventRoutes from "../routes/events.js";

// Use routes
app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);

// MongoDB connection function
const connectToDB = async () => {
  try {
    const dburi = process.env.mongoDb;
    await mongoose.connect(dburi);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to the database
connectToDB();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, (error) => {
  if (error) {
    console.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
  console.log(`Server started successfully on port ${port}`);
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

