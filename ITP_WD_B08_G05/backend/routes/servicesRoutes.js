const express = require('express');
const {
  createService,
  getAService,
  getAllServices,
  updateService,
  deleteService,
} = require('../controllers/servicesController');

const router = express.Router();

// GET all services
router.get('/', getAllServices);

// GET a Service
router.get('/:id', getAService);

// CREATE a Service
router.post('/', createService);

// UPDATE a Service
router.patch('/:id', updateService);

// DELETE a Service
router.delete('/:id', deleteService);

module.exports = router;
