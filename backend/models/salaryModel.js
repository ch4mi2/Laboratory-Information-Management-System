const mongoose = require('mongoose')

const Schema = mongoose.Schema

const salarySchema = new Schema({
    Eid:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true,

    },
    salary:{
        type:Number,
        required:true
    }

})


salarySchema.statics.createSalary = async function(Eid,post,salary){

    const memberSalary = await this.create({Eid,post,salary})
    return memberSalary

}

module.exports = mongoose.model("Salary",salarySchema)