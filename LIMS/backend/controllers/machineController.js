const Machine = require('../models/machineModel')
const mongoose = require('mongoose')

//get all machines
const getMachines = async(req , res) => {
    const machines = await Machine.find({}).sort({createdAt: -1})

    res.status(200).json(machines)
}


//get a single machine
const getMachine = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such machine'})
    }
  
    const machine = await Machine.findById(id)
  
    if (!machine) {
      return res.status(404).json({error: 'No such machine'})
    }
  
    res.status(200).json(machine)
  }


//create new workout
const createMachine = async (req , res) => {
    const {MachineType , Brand, PurchaseDate,Model, SerialNo,WarrantyExp,Manufacturer , TelNo} = req.body

    let emptyFields = []

        if(!MachineType) {
            emptyFields.push('MachineType')
        }
        if(!Brand) {
            emptyFields.push('Brand')
        }
        if(!SerialNo) {
            emptyFields.push('SerialNo')
        }
        if(!Model) {
            emptyFields.push('Model')
        }
        if(!WarrantyExp) {
            emptyFields.push('WarrantyExp')
        }
        if(!Manufacturer) {
            emptyFields.push('Manufacturer')
        }
        if(!heading) {
            emptyFields.push('heading')
        }
        if(!TelNo) {
            emptyFields.push('TelNo')
        }
        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
        } 
    //add doc to db
    try {
        const machine = await Machine.create({
            MachineType,
            Brand,
            PurchaseDate,
            Model,
            SerialNo,
            WarrantyExp,
            Manufacturer,
            TelNo})
            res.status(200).json(machine)
    }catch (error){
        res.status(400).json({error : error.message})
    }
}


//update a machine
const updateMachine = async (req , res) => {
    const {id} = req.params

    const {MachineType , Brand, PurchaseDate,Model, SerialNo,WarrantyExp,Manufacturer , TelNo} = req.body

    let emptyFields = []

    if(!MachineType) {
        emptyFields.push('MachineType')
    }
    if(!Brand) {
        emptyFields.push('Brand')
    }
    if(!PurchaseDate) {
        emptyFields.push('PurchaseDate')
    }
    if(!Model) {
        emptyFields.push('Model')
    }
    if(!SerialNo) {
        emptyFields.push('SerialNo')
    }
    if(!WarrantyExp) {
        emptyFields.push('WarrantyExp')
    }
    if(!Manufacturer) {
        emptyFields.push('Manufacturer')
    }
    if(!TelNo) {
        emptyFields.push('TelNo')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
    } else {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'Not a valid object ID'})
          }
    
        const machine = await Machine.findOneAndUpdate({_id : id},{
            ...req.body
        })
    
        if (!machine){
            return res.status(404).json({error: 'No such machine'})
        }
    
        res.status(200).json(machine)
    }
    
}


//delete a workout
const deleteMachine = async (req , res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such machine'})
      }

    const machine = await Machine.findOneAndDelete({_id : id})

    if (!machine){
        return res.status(404).json({error: 'No such machine'})
    }

    res.status(200).json(machine)
}

module.exports = {
    createMachine,
    getMachines,
    getMachine,
    deleteMachine,
    updateMachine
}