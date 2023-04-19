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
    const {machineId, machineName,MaintenanceDate , Issue ,MachinePart , brandOfMachinePart , PriceOfMachinePart , TechnicianName , TechTelno , TechnicianPayment} = req.body

    let emptyFields = []

        if(!machineId) {
            emptyFields.push('machineId')
        }
        if(!machineName) {
            emptyFields.push('machineName')
        }
        if(!MaintenanceDate) {
            emptyFields.push('MaintenanceDate')
        }
        if(!Issue) {
            emptyFields.push('Issue')
        }
        if(!MachinePart) {
            emptyFields.push('MachinePart')
        }
        if(!brandOfMachinePart) {
            emptyFields.push('brandOfMachinePart')
        }
        if(!PriceOfMachinePart) {
            emptyFields.push('PriceOfMachinePart')
        }
        if(!TechnicianName) {
            emptyFields.push('TechnicianName')
        }
        if(!TechTelno) {
            emptyFields.push('TechTelno')
        }
        if(!TechnicianPayment) {
            emptyFields.push('TechnicianPayment')
        }
        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
        } 

    //add doc to db
    try {
        const machinePart = await MachineParts.create({machineId,machineName,MaintenanceDate , Issue ,MachinePart , brandOfMachinePart , PriceOfMachinePart , TechnicianName , TechTelno , TechnicianPayment})
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

    const {machineId, machineName,MaintenanceDate , Issue ,MachinePart , brandOfMachinePart , PriceOfMachinePart , TechnicianName , TechTelno , TechnicianPayment} = req.body

    let emptyFields = []

    if(!machineId) {
        emptyFields.push('machineId')
    }
    if(!machineName) {
        emptyFields.push('machineName')
    }
    if(!MaintenanceDate) {
        emptyFields.push('MaintenanceDate')
    }
    if(!Issue) {
        emptyFields.push('Issue')
    }
    if(!SerialNo) {
        emptyFields.push('SerialNo')
    }
    if(!MachinePart) {
        emptyFields.push('MachinePart')
    }
    if(!brandOfMachinePart) {
        emptyFields.push('brandOfMachinePart')
    }
    if(!PriceOfMachinePart) {
        emptyFields.push('PriceOfMachinePart')
    }
    if(!TechnicianName) {
        emptyFields.push('TechnicianName')
    }
    if(!TechTelno) {
        emptyFields.push('TechTelno')
    }
    if(!TechnicianPayment) {
        emptyFields.push('TechnicianPayment')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
    } else {
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
}

module.exports = {
    createMachinePart,
    getMachineParts,
    getMachinePart,
    deleteMachinePart,
    updateMachinePart
}