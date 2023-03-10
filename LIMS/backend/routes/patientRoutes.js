const express = require('express');
const {
  createPatient,
  getAPatient,
  getAllPatients,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

const router = express.Router();

// GET all patients
router.get('/', getAllPatients);

// GET a patient
router.get('/:id', getAPatient);

// CREATE a patient
router.post('/', createPatient);

// UPDATE a patient
router.patch('/:id', updatePatient);

// DELETE a patient
router.delete('/:id', deletePatient);

module.exports = router;
