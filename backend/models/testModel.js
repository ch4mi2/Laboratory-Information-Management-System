const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const testSchema = new Schema({
    testID : {
        type: Number,
        required: true,
        min: 0
    },
    outsourced: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    specimen: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    heading: {
        type: String,
        required: true 
    },
    remarks: {
        type: String
    },
    subCategories: [
        { type: mongoose.Types.ObjectId, ref: 'Category' },
    ]
})

module.exports = mongoose.model('Test', testSchema);