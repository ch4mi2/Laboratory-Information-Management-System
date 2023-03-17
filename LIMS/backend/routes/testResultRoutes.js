const express = require('express') 
const {
    createTestResult,
    getPendingTestResults,
    getCompletedTestResults,
    getTestResult,
    updateTestResult
} = require('../controllers/testResultController')

const router = express.Router()

//GET pending samples
router.get('/pendingTests', getPendingTestResults)

//GET completed testResults
router.get('/completedTests', getCompletedTestResults)

//GET test result
router.get('/:id',getTestResult)

//POST new test tesult
router.post('/', createTestResult)

//UPDATE test result
router.patch('/:id', updateTestResult)

module.exports = router
