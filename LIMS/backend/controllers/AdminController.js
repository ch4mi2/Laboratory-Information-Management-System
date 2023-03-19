const Admin = require('../modules/AdminModule')
const mongooose = require('mongoose')

const createAdmin = async (req,res) => {
    const{username, pw} = req.body



    try{
        const admin = await Admin.create({username, pw})
        res.status(200).json(admin)

    } catch(error){
        res.status(400).json({error:error.mesage})

    }
}
const getaAdmin = async (req,res) => {
    const { id } = req.params

    if(!mongooose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such staff'})
    }

    const admin = await Admin.findById(id)

    if(!admin) {
        return res.status(400).json({error:'No such staff'})
    }

    res.status(200).json(admin)
}

const getAdmin = async (req,res) => {
    const admin = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admin)
}

module.exports ={
    getAdmin,
    createAdmin,
    getaAdmin,
}