// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import dotenv from 'dotenv';

// // dotenv.config();

// // const app = express();

// // const allowedOrigins = [process.env.ALLOWED_ORIGIN, "https://calendarappfrnt.vercel.app", "https://calendarapp-mocha.vercel.app"];

// // app.use(cors({
// //     origin: function (origin, callback) {
// //         if (!origin || allowedOrigins.includes(origin)) {
// //             callback(null, true);
// //         } else {
// //             callback(new Error('Not allowed by CORS'));
// //         }
// //     },
// //     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //     credentials: true
// // }));

// // app.options('*', cors());


// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // import employeeRoutes from "./routes/EmployeeRoutes.js"; 
// // import eventRoutes from "./routes/events.js";

// // app.use("/api/employees", employeeRoutes);
// // app.use("/api/events", eventRoutes);

// // const connectToDB = async () => {
// //   try {
// //     const dburi=process.env.mongoDb
// //     await mongoose.connect(dburi);
// //     console.log("Connected to MongoDB");
// //   } catch (error) {
// //     console.error("MongoDB connection error:", error);
// //     process.exit(1);
// //   }
// // };

// // connectToDB();

// // const port = process.env.PORT || 3000;
// // app.listen(port, (error) => {
// //   if (error) {
// //     console.error(`Failed to start server: ${error}`);
// //     process.exit(1);
// //   }
// //   console.log(`Server started successfully on port ${port}`);
// // });

// // app.get("/", (req, res) => {
// //   res.send("Server is running");
// // });


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// // CORS Configuration: Allow only specific origins (e.g., your front-end)
// const allowedOrigins = [process.env.ALLOWED_ORIGIN, "https://calendarappfrnt.vercel.app"];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Check if the origin is allowed, or if there is no origin (e.g., for testing)
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS Error: Not allowed by CORS'));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true  // If you're using cookies or authentication tokens, you might need this.
// }));

// // Enable OPTIONS preflight requests
// app.options('*', cors());

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import routes
// import employeeRoutes from "./routes/EmployeeRoutes.js"; 
// import eventRoutes from "./routes/events.js";

// // Use routes
// app.use("/api/employees", employeeRoutes);
// app.use("/api/events", eventRoutes);

// // MongoDB connection function
// const connectToDB = async () => {
//   try {
//     const dburi = process.env.mongoDb;
//     await mongoose.connect(dburi);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// // Connect to the database
// connectToDB();

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, (error) => {
//   if (error) {
//     console.error(`Failed to start server: ${error}`);
//     process.exit(1);
//   }
//   console.log(`Server started successfully on port ${port}`);
// });

// // Home route
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });


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
  origin: function (origin, callback) {
    // Check if the origin is allowed, or if there is no origin (e.g., for testing)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error: Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true  // If you're using cookies or authentication tokens, you might need this.
}));

// Enable OPTIONS preflight requests
app.options('*', cors());

// Middleware for parsing JSON and URL-encoded data
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
