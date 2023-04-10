const express = require('express')
const{
    createLabInfo,
    getLabInfo,
    updateLabInfo
} = require('../controllers/LabInfoController')
const router = express.Router()

//GET
router.get('/', getLabInfo)

//POST
router.post('/', createLabInfo)  

//PATCH
router.patch('/:id', updateLabInfo)

module.exports = router