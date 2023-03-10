const mongoose = require('mongoose');


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
});

const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;
