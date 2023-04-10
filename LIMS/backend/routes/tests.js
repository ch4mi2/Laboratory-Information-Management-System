const express = require('express');
const {
    getTests,
    getTest,
    createTest,
    deleteTest,
    updateTest,
    updateCategory,
    deleteCategory
} = require('../controllers/testController')

const router = express.Router();

//get all tests
router.get('/', getTests);

//get a single test
router.get('/:id', getTest);

//post a new test
router.post('/', createTest);

//delete a test
router.delete('/:id', deleteTest);

//update a test
router.patch('/:id', updateTest);

//update a category
router.patch('/category/:id', updateCategory)

//delete a category
router.delete('/category/:id', deleteCategory)


module.exports = router;