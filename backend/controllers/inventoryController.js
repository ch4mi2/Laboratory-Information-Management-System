const Inventory = require('../models/inventoryModels')
const mongoose = require('mongoose')

//get all inventory
const inventory = async (req, res) => {
    const inventory = await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(inventory)
}
//get a single inventory
const getInventory = async (req, res) => {
    const {id} =req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:'No such inventory'})
    }

    const inventory = await Inventory.findById(id)

    if(!inventory){
        return res.status(400).json({error: 'No such inventory'})
    }
    res.status(200).json(inventory)
}
//create new inventory
const creatInventory = async (req,res) => {
    const {inveType,proName,quantity,exDate} = req.body
    //add doc to bd

    let emptyFields = []
    if(!inveType){
      emptyFields.push('inveType')
    }
    if(!proName){
      emptyFields.push('proName')
    }
    if(!quantity){
      emptyFields.push('quantity')
    }
    if(!exDate){
        emptyFields.push('exDate')
      }

    if(emptyFields.length > 0){
      return res.status(400).json({error: "Please fill in all the fields", emptyFields })
  }

  if(emptyFields.length ==0){
    try{
        const inventory = await Inventory.create({inveType,proName,quantity,exDate})
        res.status(200).json(inventory)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

    
}
//delete a inventory
const deleteInventory = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:'No such inventory'})
    }

    const inventory = await Inventory.findOneAndDelete({_id: id})

    if(!inventory){
        return res.status(400).json({error: 'No such inventory'})
    }

    res.status(200).json(inventory)
}
//update a inventory
const updateInventory = async(req,res) => {
    const{id} = req.params
    const {inveType,proName,quantity,exDate} = req.body
    

    let emptyFields = []
    if(!inveType){
      emptyFields.push('inveType')
    }
    if(!proName){
      emptyFields.push('proName')
    }
    if(!quantity){
      emptyFields.push('quantity')
    }
    if(!exDate){
        emptyFields.push('exDate')
      }

    if(emptyFields.length > 0){
      return res.status(400).json({error: "Please fill in all the fields", emptyFields })
  }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({erroe:'No such inventory'})
    }

    const inventory = await Inventory.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!inventory){
        return res.status(400).json({error: 'No such inventory'})
    }

    if(emptyFields.length ==0){
        res.status(200).json(inventory)
    }

   

}


module.exports = {
    inventory,
    getInventory,
    creatInventory,
    deleteInventory,
    updateInventory
}
