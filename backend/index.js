import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const app = express();

// app.use(cors());


const corsOptions = {
  origin: 'https://calendarappfrnt.vercel.app/', // Allow only your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials to be sent
};

app.use(cors(corsOptions));


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