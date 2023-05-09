const express = require('express') 
const {
    createTestResult,
    getPendingTestResults,
    getCompletedTestResults,
    getTestResult,
    updateTestResult,
    deleteTestResult,
    deleteTestResultWithSample
} = require('../controllers/testResultController')

const router = express.Router()

//GET pending testResults
router.get('/pendingTests', getPendingTestResults)

//GET completed testResults
router.get('/completedTests', getCompletedTestResults)

//GET test result
router.get('/:id',getTestResult)

//POST new test tesult
router.post('/', createTestResult)

//UPDATE test result
router.patch('/:id', updateTestResult)

//DELETE test result
router.delete('/:id', deleteTestResult)

//DELETE test result with sample id
router.delete('/all/:id', deleteTestResultWithSample)

module.exports = router
