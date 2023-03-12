const express = require('express') 
const {
    createTestResult
} = require('../controllers/testResultController')

const router = express.Router()

//POST a new sample
router.post('/', createTestResult)

module.exports = router
