const TestResult = require('../models/testResultModel')
const mongoose = require('mongoose')

//create a new test result
const createTestResult = async (req, res) => {
    try {
      const { patient, test, result } = req.body;
  
      const testResult = await TestResult.create({
        patient,
        test,
        result
      });
  
      res.status(201).json(testResult);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  
  
    
module.exports = {
    createTestResult
}