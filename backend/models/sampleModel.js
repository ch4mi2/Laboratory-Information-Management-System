const mongoose = require('mongoose');
const Patient = require('../models/patientModel')
const Test = require('../models/testModel')


const sampleSchema = new mongoose.Schema({
  sampleID: String,
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  status: {
    type: String,
    enum: ['pending', 'collected'],
    default: 'pending',
  },
  collectionTime: {
    type: Date,
  },
  },
  { timestamps: true }
);

const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;
