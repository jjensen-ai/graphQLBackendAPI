import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,

    required: [true, 'Please enter a user name'],
    maxlength: 100,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
    required: [true, 'Please provide an email'],
  },
  password: {
    type: String,
    maxlength: 20,
    minLength: [6, 'Password is too short'],
    required: [true, 'Please enter a password'],
  },
});

export const user = mongoose.model('user', userSchema);
