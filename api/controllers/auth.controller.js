import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Checks if email exists in the database
    // If it does not, then return not found
    const validUser = await User.findOne({ email: email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    //Checks if the password is the same if user email has been found.
    // If passwords not matching, give error.
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credientials!"));

    //Saving a unique data about the user to the token to authenticate the user when needed.
    //Using the id created in the mongo db as if this token is found no personal data is leaked.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //Removes the password, so when sending response back to user password is not seen.
    //Makes the application more secure.
    const {password: pass, ...userInfo} = validUser._doc;

    // Created a cookie to store the token in creating a session for the user.
    // Cookie expires in a couple of months.
    // httpOnly so no other third party application can access the cookie to make it secure.
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 60 * 1000),
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};
