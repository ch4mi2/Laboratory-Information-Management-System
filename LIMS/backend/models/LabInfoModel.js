const mongoose = require('mongoose');


const LabInfoSchema = new mongoose.Schema({
    name: String,
    address: String,
    tel1: String,
    tel2: String,
    tel3: String,
    email: String
  }, { timestamps: true });
  

const LabInfo = mongoose.model('LabInfo',LabInfoSchema);

module.exports = LabInfo;
