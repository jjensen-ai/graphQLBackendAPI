import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 100,
    required: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    maxlength: 50,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    maxlength: 50,
    unique: true,
    lowercase: true,
  },
  gender: {
    type: String,
    maxlength: 25,
    array: ['Male', 'Female', 'Other', 'Prefer not to disclose'],
  },
  salary: {
    type: Number,
    required: true,
  },
});

export const employee = mongoose.model('employee', employeeSchema);
