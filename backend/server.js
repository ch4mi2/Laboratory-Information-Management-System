require('dotenv').config(); //require and directly invoke the config method

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const patientRoutes = require('./routes/patientRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const billRoutes = require('./routes/billRoutes');
const expensesRoutes = require('./routes/expensesRoutes');;
const sampleRoutes = require('./routes/samples');
const testRoutes = require('./routes/tests');
const testResultRoutes = require('./routes/testResultRoutes');;
const machineRoutes = require('./routes/machineRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes');
const StaffRoutes = require('./routes/StaffRoutes.js');
const AdminRoute = require('./routes/AdminRoute.js');
const LabInfoRoutes = require('./routes/LabInfoRoutes.js');
const machinePartsRoute = require('./routes/machinePartsRoute');
const serviceMachineRoute = require('./routes/serviceMachineRoutes')
const AttendanceRoute = require('./routes/AttendanceRoute')
const SalaryRoute = require('./routes/salaryRoutes')

//express app
const app = express(); //invokes the function

// Enable CORS for all routes
app.use(cors());

//middleware
app.use(express.json()); //if the request has a body or data then it passes and attaches to req object

app.use((req, res, next) => {
  // next is used to move to the next piece of middleware
  console.log(req.path, req.method);
  next();
}); //this function will fire for every request

//routes
app.use('/api/patients/', patientRoutes);
app.use('/api/services/', servicesRoutes);
app.use('/api/bills/', billRoutes);
app.use('/api/expenses/', expensesRoutes);
app.use('/api/samples', sampleRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/testResult', testResultRoutes);
app.use('/api/inventoryRoutes', inventoryRoutes);
app.use('/api/machines' , machineRoutes );
app.use('/api/Staff', StaffRoutes);
app.use('/api/Admin', AdminRoute);
app.use('/api/labInfo', LabInfoRoutes);
app.use('/api/machineParts' , machinePartsRoute)
app.use('/api/serviceMachines' , serviceMachineRoute)
app.use('/api/Attendance', AttendanceRoute)
app.use('/api/Salary' , SalaryRoute)

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      //process is a global object available in node
      console.log(`connected to db and listening  on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
