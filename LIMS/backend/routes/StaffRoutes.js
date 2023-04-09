const express = require('express')
const{
    createStaff,
    getStaff,
    getStaffs,
    deleteStaff,
    updateStaff,
} = require('../controllers/StaffControllers')

const router = express.Router()

//GET all Staff
router.get('/', getStaffs)

//GET a single Staff member
router.get('/:id', getStaff)

//POST a new Staff member
router.post ('/', createStaff)

//DELETE a Staff member
router.delete('/:id', deleteStaff)

//UPDATE a Staff member
router.patch('/:id', updateStaff)

module.exports = router