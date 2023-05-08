const mongoose = require('mongoose')

const Schema = mongoose.Schema

const machineSchema = new Schema({
    MachineType:{
        type: String,
        required:true
    },
    Brand:{
        type: String,
        required:true
    },
    PurchaseDate:{
        type: String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Model:{
       type: String,
        required:true
    },
    SerialNo:{
        type: String,
        required:true
    },
    WarrantyExp:{
        type: String,
        required:true
    },
    Manufacturer:{
        type: String,
        required:true
    },
    TelNo:{
        type:Number,
        required:true,
        maxlength:10
    }
} , {timestamps : true})

module.exports = mongoose.model('Machine' , machineSchema)

