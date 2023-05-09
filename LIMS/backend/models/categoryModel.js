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
        required: true,
        min: 0
    },
    operatorM: {
        type: String,
        required: true
    },
    endMRef: {
        type: Number,
        min: 0
    },
    startFRef: {
        type: Number,
        required: true,
        min: 0
    },
    operatorF: {
        type: String,
        required: true
    },
    endFRef: {
        type: Number,
        min: 0
    },
    startBRef: {
        type: Number,
        min: 0
    },
    operatorB: {
        type: String
    },
    endBRef: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model('Category', categorySchema);