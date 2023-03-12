const Sample = require('../models/sampleModel')
const mongoose = require('mongoose')
const bwipjs = require('bwip-js')



// get all samples
const getSamples = async (req, res) => {
  try {
    const samples = await Sample.find({})
      .populate('patient')
      .sort({createdAt: -1})
      .exec();

    res.status(200).json(samples);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error retrieving samples', error: err});
  }
}



// get a single sample 
const getSample = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
      } // this code checks whether its a valid id

    const sample = await Sample.findById(id)

    if(!sample){
        return res.status(404).json({error: 'No such sample'})
    }

    res.status(200).json(sample)
}


//create a new sample
const createSample = async (req, res) => {
    const { patient, test } = req.body;
  
    // Generate sample ID using current year and a sequential number
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const lastSample = await Sample.findOne({}).sort({ sampleID: -1 }).exec();
    const lastNumber = lastSample ? parseInt(lastSample.sampleID.slice(-6)) : 0;
    const newNumber = (lastNumber + 1).toString().padStart(6, '0');
    const sampleID = `${currentYear}${newNumber}`;
  
    // Generate collection time as current date and time
    const collectionTime = new Date();
  
    // Create new sample with generated ID and collection time
    try {
      const sample = await Sample.create({
        sampleID,
        patient,
        test,
        collectionTime
      });
      res.status(201).json(sample);
    } catch(error) {
      res.status(400).json({error: error.message});
    }
  };
  
//delete a sample
const deleteSample = async (req, res) => {
    const{ id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such sample'})
      }

    const sample = await Sample.findOneAndDelete({_id: id}) 
    //explicitly telling Mongoose to search for a document where the _id 
    //property matches the value of id 

    if(!sample) {
        return res.status(400).json({error: 'No such workout'})
      }
    
      res.status(200).json(sample)
}

//update a sample
const updateSample = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such sample'})
    }
  
    const sample = await Sample.findOneAndUpdate({_id: id}, {
      ...req.body // spreading the object
    })
  
    if (!sample) {
      return res.status(400).json({error: 'No such sample'})
    }
  
    res.status(200).json(sample)
  }

//generate barcode
const generateBarcode = async(req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such sample'})
      } // this code checks whether its a valid id

    const sample = await Sample.findById(id)

    if(!sample){
        return res.status(404).json({error: 'No such sample'})
    }

    const sampleId = sample.sampleID

    try {
        // Generate barcode image using sample ID
        const barcodeOpts = {
          bcid: 'code128',    // Barcode type
          text: sampleId,  // Text to encode
          scale: 3,           // Barcode image scale factor
          height: 10,         // Barcode image height, in millimeters
          includetext: true,  // Show human-readable text
          textxalign: 'center', // Center the text below the barcode
        };
        const pngBuffer = await bwipjs.toBuffer(barcodeOpts);
        
        // Set response headers and send the barcode image as a response
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', `attachment; filename="${req.params.sampleId}.png"`);
        res.send(pngBuffer);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}  

// POST request handler for barcode reader
/*router.post('/barcode', async (req, res) => {
    const { sampleID } = req.body;
    console.log(sampleID)
  
    try {
      const sample = await Sample.findOne({ sampleID });
  
      if (!sample) {
        return res.status(404).json({ error: 'No such sample' });
      }
  
      res.status(200).json(sample);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  */

module.exports = {
    getSamples,
    getSample,
    createSample,
    deleteSample,
    updateSample,
    generateBarcode
}