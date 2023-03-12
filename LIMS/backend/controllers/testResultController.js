const TestResult = require('../models/testResultModel')
const mongoose = require('mongoose')


getPendingTestResults = async (req,res) => {
    try {
        const testResults = await TestResult.find({status: 'pending'})
            .populate('patient')
            .populate('test')
            .populate('result.category')
            .sort({createdAt: -1})
            .exec();

        res.status(200).json(testResults);    
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error retrieving samples', error: err}); 
    }
}

getCompletedTestResults = async (req,res) => {
    try {
        const testResults = await TestResult.find({status: 'completed'})
            .populate('patient')
            .populate('test')
            .populate('result.category')
            .sort({createdAt: -1})
            .exec();

        res.status(200).json(testResults);    
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error retrieving samples', error: err}); 
    }
}

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
    createTestResult,
    getPendingTestResults,
    getCompletedTestResults
}