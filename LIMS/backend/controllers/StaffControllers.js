const Staff = require('../modules/StaffModules')
const mongooose = require('mongoose')
//get all staff members
const getStaffs = async (req,res) => {
    const staff = await Staff.find({}).sort({createdAt: -1})

    res.status(200).json(staff)
}

//get a single staff member
const getStaff = async (req,res) => {
    const { id } = req.params

    if(!mongooose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such staff'})
    }

    const staff = await Staff.findById(id)

    if(!staff) {
        return res.status(400).json({error:'No such staff'})
    }

    res.status(200).json(staff)
}

//create a new staff member
const createStaff = async (req,res) => {
    const{name, NIC, Eid, contact, post, email, username, pw} = req.body



    try{
        const staff = await Staff.create({name, NIC, Eid, contact, post, email, username, pw})
        res.status(200).json(staff)

    } catch(error){
        res.status(400).json({error:error.mesage})

    }
}

//delete a staff member
const deleteStaff = async (req,res) => {
    const { id } = req.params

    if(!mongooose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such staff'})
    }

    const staff = await Staff.findOneAndDelete({_id: id})

    if(!staff) {
        return res.status(400).json({error:'No such staff'})
    }

    res.status(200).json(staff)
}

//update staff member

const updateStaff = async (req,res) => {
    const { id } = req.params

    if(!mongooose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such staff'})
    }

    const staff = await Staff.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!staff) {
        return res.status(400).json({error:'No such staff'})
    }

    res.status(200).json(staff)


}


module.exports = {
    getStaff,
    getStaffs,
    createStaff,
    deleteStaff,
    updateStaff,
}