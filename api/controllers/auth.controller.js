import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  //Tries to save the user to the mongodb
  //Send code 201 if created
  //Otherwise send error code back to user.
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(errorHandler(550, error.message));
  }
};
