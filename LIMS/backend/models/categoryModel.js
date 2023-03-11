const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryHeading: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    UOM: {
        type: String,
        required: true
    },
    startMRef: {
        type: Number,
        required: true
    },
    operatorM: {
        type: String,
        required: true
    },
    endMRef: {
        type: Number,
        required: true
    },
    startFRef: {
        type: Number,
        required: true
    },
    operatorF: {
        type: String,
        required: true
    },
    endFRef: {
        type: Number,
        required: true
    },
    startBRef: {
        type: Number
    },
    operatorB: {
        type: String
    },
    endBRef: {
        type: Number
    }
});

module.exports = mongoose.model('Category', categorySchema);