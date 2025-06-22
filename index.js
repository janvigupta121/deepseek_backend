// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import userRoutes from './routes/user.route.js';
// import promptRoutes from './routes/prompt.route.js';


// dotenv.config();
// const app = express();
// const port = process.env.PORT || 3000;
// const MONGO_URI=process.env.MONGO_URI


// //middleware
// app.use(express.json());
// app.use(cookieParser());


// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],

// }));

// //db connec tion code
// mongoose.connect(MONGO_URI).then(()=>console.log("Connected to MongoDB")).catch((error)=>console.log("MongoDB connection error",error));

// // app.get('/', (req, res) => {
// //   res.send('Hello')
// // })

// //routes
// app.use("/api/v1/user",userRoutes);
// app.use("/api/v1/deepseekai",promptRoutes);
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`)
// });




import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import promptRoutes from './routes/prompt.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

//  Middleware
app.use(express.json());
app.use(cookieParser());

//  Flexible CORS setup
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//  Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => console.log(" MongoDB connection error:", error));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/deepseekai", promptRoutes);

//Start server
app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});

