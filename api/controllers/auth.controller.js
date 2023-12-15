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
    const { password: pass, ...userInfo } = validUser._doc;

    // Created a cookie to store the token in creating a session for the user.
    // Cookie expires in a couple of months.
    // httpOnly so no other third party application can access the cookie to make it secure.
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

//For google authentication
export const google = async (req, res, next) => {
  
  try {
    
    //If the user email is already in the mongo db then 
    //Log them in.
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      //console.log("I am here");
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      //console.log("I am here2");
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);

    } else {

      //Create a random 16 character password
      //Adds the user to the mongo db since they used google they have
      //no password so auto generate so they can be added.
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      //Creating a unique username to avoid conflict
      const randomUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      //Add the user
      const newUser = new User({
        username: randomUsername,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          SameSite: None,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    //console.log(error);
    next(error);
  }
};
