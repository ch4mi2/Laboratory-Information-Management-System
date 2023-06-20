const LabInfo = require('../models/LabInfoModel')
const mongoose = require('mongoose')

//get 
const getLabInfo = async (req, res) => {
  try {
    const labInfo = await LabInfo.findOne();
    res.status(200).json(labInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


//post
const createLabInfo = async(req,res) => {
    const {name, address, tel1, tel2, tel3, email} = req.body;

    try {
        const labInfo = await LabInfo.create({name, address, tel1, tel2, tel3, email})
        res.status(200).json(labInfo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//patch
const updateLabInfo = async (req, res) => {
    const { id } = req.params
    const { name, address, tel1} = req.body;

    let emptyFields = []
    if(!name){
      emptyFields.push('name')
    }
    if(!address){
      emptyFields.push('address')
    }
    if(!tel1){
      emptyFields.push('tel1')
    }

    if(emptyFields.length > 0){
      return res.status(400).json({error: "Please fill in all the fields", emptyFields })
  }
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such lab info'})
    }
  
    const labInfo = await LabInfo.findOneAndUpdate({_id: id}, {
      ...req.body // spreading the object
    })
  
    if (!labInfo) {
      return res.status(400).json({error: 'No such lab info'})
    }
  
    if(emptyFields.length ==0){
      res.status(200).json(labInfo)
  }
  }

module.exports = {
    createLabInfo,
    getLabInfo,
    updateLabInfo
}