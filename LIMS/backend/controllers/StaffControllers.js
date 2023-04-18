const Staff = require('../models/StaffModules');
const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const auth = require('../middleware/requireStaffAuth')






const createToken = (_id) =>{
  return jwt.sign({_id},process.env.SECRET, {expiresIn:'3d'})

}


//get all staff members
const getStaffs = async (req, res) => {
  const staff = await Staff.find({}).sort({ createdAt: -1 });

  res.status(200).json(staff);
};

//get a single staff member
const getStaff = async (req, res) => {

  const { id } = req.params

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such staff' });
  }

  const staff = await Staff.findById(id);



  if (!staff) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(staff);
  
};

//create a new staff member
const createStaff = async (req,res) => {
  const{name, NIC, Eid, contact, post, email, username, pw} = req.body

  let emptyFields = []
    if(!name){
        emptyFields.push('name')
    }
    if(!NIC){
        emptyFields.push('NIC')
    }
    if(!Eid){
        emptyFields.push('Eid')
    }
    if(!contact){
        emptyFields.push('contact')
    }
    if(!post){
        emptyFields.push('post')
    }
    if(!email){
        emptyFields.push('email')
    }
    if(!username){
        emptyFields.push('username')
    }
    if(!pw){
        emptyFields.push('pw')
    }
    if (emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill all the fields', emptyFields})
        }



  try{
    //const user_id = req.admin._id
      
      const staffMember = await Staff.creatingStaff(name, NIC, Eid, contact, post, email, username, pw)

      //create token
      const token = createToken(staffMember._id)
      const userid = staffMember._id
      
      console.log(staffMember);
      res.status(200).json({staffMember,token,userid})

  } catch(error){
      res.status(400).json({error:error.message})

  }
}

//delete a staff member
const deleteStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such staff' });
  }

  const staff = await Staff.findOneAndDelete({ _id: id });

  if (!staff) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(staff);
};

//update staff member

const updateStaff = async (req, res) => {
  const { id } = req.params;

  if (!mongooose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such staff' });
  }

  const staff = await Staff.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!staff) {
    return res.status(400).json({ error: 'No such staff' });
  }

  res.status(200).json(staff);
};

//login user 
const loginStaff = async (req,res) => {
  const {username,pw} = req.body

  try{
    const staffMember = await Staff.login(username,pw)
    const token = createToken(staffMember._id)
    const userid = staffMember._id
    

    res.status(200).json({username,token,userid})

} catch(error){
    res.status(400).json({error:error.mesage})

}


  
}

const fetchProfile = async(req,res) => {
  
    const profile = await Staff.profile()

    res.status(200).json(profile)
  
  
}

module.exports = {
  getStaff,
  getStaffs,
  createStaff,
  deleteStaff,
  updateStaff,
  loginStaff,
  fetchProfile,
};
