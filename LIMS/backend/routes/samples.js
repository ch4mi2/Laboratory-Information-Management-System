const express = require('express') 
const {
    getSamples,
    getPendingSamples,
    getCollectedSamples,
    getSample,
    createSample,
    deleteSample,
    updateSample,
    generateBarcode
} = require('../controllers/sampleController')

const router = express.Router()

//Get all samples
router.get('/', getSamples)

//Get pending samples
router.get('/pendingSamples',getPendingSamples)

//Get collected samples
router.get('/collectedSamples',getCollectedSamples)

//Get a single sample
router.get('/:id', getSample)

//POST a new sample
router.post('/', createSample)

//DELETE a sample
router.delete('/:id', deleteSample)

//UPDATE a new sample
router.patch('/:id', updateSample)

//generate barcode
router.get('/barcode/:id', generateBarcode)


module.exports = router
