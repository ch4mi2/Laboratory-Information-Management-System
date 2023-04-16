const express = require('express')

const {
    createMachinePart,
    getMachineParts,
    getMachinePart,
    deleteMachinePart,
    updateMachinePart
} = require('../controllers/machinePartsController')

const router = express.Router()

//GET all machines
router.get('/' , getMachineParts)

//GET a single machine
router.get('/:id' , getMachinePart)

//CREATE  a single machine part
router.post('/' , createMachinePart )

//DELETE a single machine part
router.delete('/:id' , deleteMachinePart)

//UPDATE  a single machine part
router.patch('/:id' , updateMachinePart)

module.exports = router