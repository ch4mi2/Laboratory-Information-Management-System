const mongoose = require('mongoose');


const testResultSchema = new mongoose.Schema({
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
    },
    sample:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sample'
    },
    result: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
        value: {
          type: Number,
          
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
