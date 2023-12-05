import mongoose from "mongoose";

// Creating a schema for the mongodb to use for a new user.
//timestamp allows to sort the users by latest and etc.
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;