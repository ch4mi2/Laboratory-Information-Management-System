const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StaffSchema = new Schema({
    name: {
        type:String,
        required : true
    },
    NIC:{
        type:String,
        required:true
    },
    Eid:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    pw:{
        type:String,
        required:true
    }
    
}, {timestamps:true})

module.exports = mongoose.model('Staff', StaffSchema )