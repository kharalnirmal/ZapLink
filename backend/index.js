import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config({ path: './.env' })
import connectDB from "./src/config/mongo.config.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



  const app = express();

// !  middlewares

  app.use(cors({
    origin:"https://zaplink-frontend.onrender.com", // frontend url
    credentials:true

  }));
  
  app.use(express.json()); // Lets Express automatically parse JSON from frontend requests (req.body)


  // ! connect to database
connectDB();



//for test 
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    database: 'Connected',
    port: process.env.PORT 
  });
});


  //routes import
import urlRouter from './src/routes/url.route.js';
import { getUrlStats, redirectUrl } from './src/controller/url.controller.js';
app.use('/api/urls', urlRouter);
app.get('/:urlCode',redirectUrl)//redirect should be in root level
// app.use('/api/urls',urlRouter )
// auth routes
import authRouter from './src/routes/auth.route.js';
app.use('/api/auth',authRouter)



  app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })

  