const express = require('express');
const {
  createBill,
  getBill,
  getBills,
  deleteBill,
  updateBill,
} = require('../controllers/billController');

const router = express.Router();

// GET all Bills
router.get('/', getBills);

// GET a single Bill
router.get('/:id', getBill);

// POST a new Bill
router.post('/', createBill);

// DELETE a Bill
router.delete('/:id', deleteBill);

// UPDATE a Bill
router.patch('/:id', updateBill);

module.exports = router;
