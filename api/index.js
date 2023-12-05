import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/user.route.js";
dotenv.config();

//This connects you to your mongo database.
//Create a .env file and save your connection string with variable MONGO to connect to your own db.
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);