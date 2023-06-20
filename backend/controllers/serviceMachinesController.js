const ServiceMachines = require('../models/serviceMachineModel');
const mongoose = require('mongoose')

//gel all service Dates
const getServiceDates = async (req , res) => {
    const serviceDates = await ServiceMachines.find({}).sort({createdAt: -1})

    res.status(200).json(serviceDates)
}

//get a service Date
const getServiceDate = async (req , res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such machine service"})
    }

    const serviceMachine = await ServiceMachines.findById(id)

    if(!serviceMachine){
        return res.status(404).json({error: 'No such machine service'})
    }

    res.status(200).json(serviceMachine)
}

//create a machine service
const createServiceDates = async (req , res) =>{
    const {machineId, machineName,LastserviceDate, NextServiceDate , TechnicianName , TechTelno , TechnicianPayment} = req.body

    let emptyFields = []

        if(!machineId) {
            emptyFields.push('machineId')
        }
        if(!machineName) {
            emptyFields.push('machineName')
        }
        if(!LastserviceDate) {
            emptyFields.push('LastserviceDate')
        }
        if(!NextServiceDate) {
            emptyFields.push('NextServiceDate')
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
        const serviceMachine = await ServiceMachines.create({machineId,machineName,LastserviceDate, NextServiceDate , TechnicianName , TechTelno , TechnicianPayment})
        res.status(200).json(serviceMachine)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete a machine service
const deleteMachineService = async (req , res) => {
    const {id} = req. params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such machine service"})
    }

    const serviceMachine = await ServiceMachines.findOneAndDelete({_id: id})

    if(!serviceMachine){
        return res.status(400).json({error: 'No such machine service'})
    }

    res.status(200).json(serviceMachine)
}

//update a machine service
const updateServiceDates = async (req , res) => {
    const {id} = req. params

    const {LastserviceDate, NextServiceDate , TechnicianName , TechTelno , TechnicianPayment} = req.body

    let emptyFields = []

        if(!LastserviceDate) {
            emptyFields.push('LastserviceDate')
        }
        if(!NextServiceDate) {
            emptyFields.push('NextServiceDate')
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
    } else{

         if (!mongoose.Types.ObjectId.isValid(id)){
             return res.status(404).json({error: "No such machine service"})
        }

        const serviceMachine = await ServiceMachines.findByIdAndUpdate({_id: id} , {
            ...req.body
        })

        if(!serviceMachine){
            return res.status(400).json({error: 'No such machine service'})
        }

        res.status(200).json(serviceMachine)

    }
}

module.exports = {
    createServiceDates,
    getServiceDates,
    getServiceDate,
    deleteMachineService,
    updateServiceDates
}