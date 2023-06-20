const express = require('express')

const {
    createServiceDates,
    getServiceDate,
    getServiceDates,
    updateServiceDates,
    deleteMachineService
 } = require('../controllers/serviceMachinesController')

const router = express.Router()

//GET all machine services
router.get('/' , getServiceDates)

//GET a single machine service
router.get('/:id' , getServiceDate)

//CREATE  a single machine service
router.post('/' , createServiceDates)

//DELETE a single machine part
router.delete('/:id' , deleteMachineService)

//UPDATE  a single machine part
router.patch('/:id' , updateServiceDates)

module.exports = router