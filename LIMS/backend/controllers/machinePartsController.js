const MachineParts = require('../models/machinePartsModel');
const mongoose = require('mongoose')

//gel all machine parts
const getMachineParts = async (req , res) => {
    const machinePart = await MachineParts.find({}).sort({createdAt: -1})

    res.status(200).json(machinePart)
}

//get a machine part
const getMachinePart = async (req , res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such machine part"})
    }

    const machinePart = await MachineParts.findById(id)

    if(!machinePart){
        return res.status(404).json({error: 'No such machine part'})
    }

    res.status(200).json(machinePart)
}

//create a machine part
const createMachinePart = async (req , res) =>{
    const {machineId , MaintenanceDate , Issue ,MachinePart , brandOfMachinePart , PriceOfMachinePart , TechnicianName , TechTelno , TechnicianPayment} = req.body

    //add doc to db
    try {
        const machinePart = await MachineParts.create({machineId , MaintenanceDate , Issue ,MachinePart , brandOfMachinePart , PriceOfMachinePart , TechnicianName , TechTelno , TechnicianPayment})
        res.status(200).json(machinePart)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete a machine part
const deleteMachinePart = async (req , res) => {
    const {id} = req. params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such machine part"})
    }

    const machinePart = await MachineParts.findOneAndDelete({_id: id})

    if(!machinePart){
        return res.status(400).json({error: 'No such machine part'})
    }

    res.status(200).json(machinePart)
}

//update a machine part
const updateMachinePart = async (req , res) => {
    const {id} = req. params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such machine part"})
    }

    const machinePart = await MachineParts.findByIdAndUpdate({_id: id} , {
        ...req.body
    })

    if(!machinePart){
        return res.status(400).json({error: 'No such machine part'})
    }

    res.status(200).json(machinePart)
}

module.exports = {
    createMachinePart,
    getMachineParts,
    getMachinePart,
    deleteMachinePart,
    updateMachinePart
}