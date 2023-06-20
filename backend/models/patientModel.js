const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
      maxlength: 12,
    },
    tpNo: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
      min: 0,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
