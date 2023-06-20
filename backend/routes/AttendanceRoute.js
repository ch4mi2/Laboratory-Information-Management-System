const express = require ('express')
const Attendance = require('../models/attendanceModel')
const {
    createAtt,
    markAtt,
    deleteAtt,
    getAtt,
    getaAtt,
    
} = require('../controllers/AttendanceController')

const router = express.Router()

router.post('/',createAtt)

//get an att
router.get('/:id',getaAtt)

//get all att
router.get('/',getAtt)

//mark att
router.patch('/:id',markAtt)

//dlt att
router.delete('/:id',deleteAtt)




module.exports = router