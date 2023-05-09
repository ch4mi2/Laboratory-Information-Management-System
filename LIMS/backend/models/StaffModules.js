const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const auth = require('../middleware/requireStaffAuth')


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
        required:true,
        unique:true
    },
    pw:{
        type:String,
        required:true
    },
    
    
}, {timestamps:true})



StaffSchema.statics.creatingStaff = async function(name,NIC,Eid,contact,post,email,username,pw)  {
//validations
    
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(pw))
    {
        throw Error('Password not strong enough')
    }

    const exist = await this.findOne({username})
    const exist1 = await this.findOne({Eid})

    if(exist1) {
        throw Error('Employee id is in use')
    }

    if(exist) {
        throw Error('Username in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pw,salt)
    

    const staffMember = await this.create({name,NIC,Eid,contact,post,email,username, pw:hash})
    return staffMember

}

//static login method

StaffSchema.statics.login = async function(username,pw){
    if(!username || !pw)
    {
        throw Error('Fill all the fields')
    }

    const user = await  this.findOne({username})

    if(!user)
    {
        throw Error("Incorrect username")
    }

    const match = await bcrypt.compare(pw, user.pw)

    if(!match)
    {
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('Staff', StaffSchema )