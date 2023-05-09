const Attendance = require('../models/attendanceModel');
const mongooose = require('mongoose')


//get all att
const getAtt = async(req, res)=>{
    const att = await Attendance.find({}).sort({ createdAt: -1 });

    res.status(200).json(att);


};

//get one att
const getaAtt = async(req,res) => {
    const { id } = req.params

  

  const att = await Attendance.findOne({$or:[{Eid : id}]});



  if (!att) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(att);
};

// create att
const createAtt = async(req,res) => {
    const{name,Eid,attendance} = req.body

    try{

    const att = await Attendance.createAttendance(name,Eid,attendance)

    console.log(att)
    res.status(200).json({att})

    }
    catch(error){
        res.status(400).json({error:error.message})
    }



};

//mark attendance
const markAtt = async (req, res) => {
    const { id } = req.params;

    
    
      const att = await Attendance.findOneAndUpdate(
        { Eid: id },
        {
          ...req.body,
        }
      );
    
      if (!att) {
        return res.status(400).json({ error: 'Attendance did not marked' });
      }
    
      res.status(200).json(att);
    
  };

// delete att
  const deleteAtt = async (req, res) => {
    const { id } = req.params;
  
    if (!mongooose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such staff' });
    }
  
    const att = await Attendance.findOneAndDelete({ _id: id });
  
    if (!att) {
      return res.status(400).json({ error: 'No such staff' });
    }
  
    res.status(200).json(att);
  };






  module.exports ={
    getAtt,
    getaAtt,
    deleteAtt,
    createAtt,
    markAtt,
    
  };