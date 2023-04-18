const express = require('express')

const {
    createMachine,
    getMachines,
    getMachine,
    deleteMachine,
    updateMachine
} = require ('../controllers/machineController')

const router = express.Router()

//GET all machines
router.get('/' , getMachines)

//GET a single machine
router.get('/:id' , getMachine)

//POST a new machine
router.post('/' , createMachine)

//UPDATE a machine
router.patch('/:id' , updateMachine)

//DELETE a machine
router.delete('/:id' , deleteMachine)

module.exports = router