const express = require('express');
const {
    creatInventory,
    inventory,
    getInventory,
    deleteInventory,
    updateInventory
} = require('../controllers/inventoryController')


const router = express.Router();

//GET all inventory
router.get('/',inventory)
//GET a inventory
router.get('/:id',getInventory)
//CREATE a inventory
router.post('/',creatInventory)
//UPDATE inventory
router.patch('/:id', updateInventory)
//DELETE inventory
router.delete('/:id',deleteInventory)
module.exports = router