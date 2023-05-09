const Salary = require('../models/salaryModel');
const mongoose = require('mongoose');


//create
const createSal = async(req,res) => {
    const{Eid,post,salary} = req.body

    try{

    const sal = await Salary.createSalary(Eid,post,salary)

    console.log(sal)
    res.status(200).json({sal})

    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete
const deleteSal = async (req, res) => {
    const { id } = req.params;
  
    
  
    const sal = await Salary.findOneAndDelete({ Eid: id });
  
    if (!sal) {
      return res.status(400).json({ error: 'No such staff' });
    }
  
    res.status(200).json(sal);
  };

  //get all
  const getSal = async(req, res)=>{
    const sal = await Salary.find({}).sort({ createdAt: -1 });

    res.status(200).json(sal);


};

//get one
const getaSal = async(req,res) => {
    const { id } = req.params

  

  const sal = await Salary.findOne({$or:[{Eid : id}]});



  if (!sal) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(sal);
};


module.exports={
    getSal,
    getaSal,
    createSal,
    deleteSal,
}