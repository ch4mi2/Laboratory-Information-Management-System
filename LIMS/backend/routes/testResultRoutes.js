const express = require('express') 
const {
    createTestResult,
    getPendingTestResults,
    getCompletedTestResults
} = require('../controllers/testResultController')

const router = express.Router()

//GET pending samples
router.get('/pendingTests', getPendingTestResults)

//GET completed testResults
router.get('/completedTests', getCompletedTestResults)

//POST a new sample
router.post('/', createTestResult)

module.exports = router
