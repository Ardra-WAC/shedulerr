import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import employeeRoutes from "./routes/EmployeeRoutes.js"; 
import eventRoutes from "./routes/events.js";

app.use("/api/employees", employeeRoutes);
app.use("/api/events", eventRoutes);

const connectToDB = async () => {
  try {
    const dbURI =
      "mongodb+srv://ardrawac:wOKSKRcDz7B2XvDZ@mycluster.k2c3q.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster";
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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