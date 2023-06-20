const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    Eid:{
        type:String,
        required:true
    },
    attendance:{
        type:Number,
        required:true
        
    }


    

},
{timestamps:true}



)

attendanceSchema.statics.createAttendance = async function(name,Eid,attendance){

    
    const memberAtt = await this.create({name,Eid,attendance})
    return memberAtt
    
}

//attendanceSchema.statics.markAtt = async function(attendance)
//{
//    attendance = attendance + 1
//}


const getone = async(req,res) => {
    const{Eid} = req.param

  

  const att = await Attendance.findById(Eid);



  if (!att) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(att);
}

module.exports = mongoose.model("Attendance", attendanceSchema)
