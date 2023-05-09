const express = require('express')

const {
    createSal,
    getSal,
    getaSal,
    deleteSal,
} = require('../controllers/salaryController')

const router = express.Router()

router.post('/',createSal)

router.get('/:id',getaSal)

router.get('/',getSal)

router.delete('/:id',deleteSal)


module.exports = router