const mongoose = require('mongoose')

const Schema = mongoose.Schema

const machineMaintenanceSchema = new Schema({
    machineId:{
        type: mongoose.Types.ObjectId, ref: 'Machine' 
    },
    machineName:{
        type: String,
        required:true
    },
    MaintenanceDate:{
        type: String,
        required:true
    },
    Issue:{
        type: String,
        required:true
    },
    MachinePart:{
        type: String,
        required:true
    },
    brandOfMachinePart:{
        type: String,
        required:true
    },
    PriceOfMachinePart:{
        type: String,
        required:true
    },
    TechnicianName:{
        type: String,
        required:true
    },
    TechTelno:{
        type: String,
        maxlength:15 //with country code
    },
    TechnicianPayment:{
        type: String,
        required:true
    }
} , {timestamps : true})

module.exports = mongoose.model('Maintenance' , machineMaintenanceSchema)

