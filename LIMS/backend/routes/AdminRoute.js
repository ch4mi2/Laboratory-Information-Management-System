const express = require('express')
const{
    getAdmin,
    createAdmin,
    getaAdmin,

} = require('../controllers/AdminController')

const router = express.Router()

router.get('/', getAdmin)

router.post('/', createAdmin)

router.get('/:id', getaAdmin)

module.exports = router