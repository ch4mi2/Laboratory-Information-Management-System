const mongoose = require('mongoose')

const Schema = mongoose.Schema

const inventorySchema = new Schema({
    inveType:{
        type: String,
        required:true
    },
    proName:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    exDate:{
        type:Date,
        required:true

    }
},{timestamps: true})

module.exports = mongoose.model('Inventory', inventorySchema)