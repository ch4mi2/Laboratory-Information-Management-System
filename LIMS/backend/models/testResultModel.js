const mongoose = require('mongoose');
const Patient = require('../models/patientModel');
const Test = require('../models/testModel');
const Category = require('../models/categoryModel');

const testResultSchema = new mongoose.Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
    },
    result: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
        value: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
      },
      },
      { timestamps: true }
  );
  

module.exports = mongoose.model('TestResult', testResultSchema);
