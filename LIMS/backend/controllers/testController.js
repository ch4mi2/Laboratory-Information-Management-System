const Test = require('../models/testModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

//retrieve All tests
const getTests = async(req,res) => {
    const test = await Test.find({}).sort({ testID: 1 });

    res.status(200).json(test);
}

//retrieve a specific test
const getTest = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    const test = await Test.findById(id).populate('subCategories');

    if(!test) {
        return res.status(404).json({error: 'No such test'})
    }

    res.status(200).json(test);
}

//create a test
const createTest = async(req,res) => {
    const { testID,outsourced,testName,shortName,specimen,price,heading,remarks,
        categoryHeading,category,UOM,startMRef,operatorM,endMRef,startFRef,operatorF,endFRef,startBRef,operatorB,endBRef } =  req.body;
        var test;

        //validation
        let emptyFields = []

        if(!testID) {
            emptyFields.push('testID')
        }
        if(!outsourced) {
            emptyFields.push('outsourced')
        }
        if(!testName) {
            emptyFields.push('testName')
        }
        if(!shortName) {
            emptyFields.push('shortName')
        }
        if(!specimen) {
            emptyFields.push('specimen')
        }
        if(!price) {
            emptyFields.push('price')
        }
        if(!heading) {
            emptyFields.push('heading')
        }
        if(!category) {
            emptyFields.push('category')
        }
        if(!UOM) {
            emptyFields.push('UOM')
        }
        if(!startMRef) {
            emptyFields.push('startMRef')
        }
        if(!operatorM) {
            emptyFields.push('operatorM')
        }
        if(!endMRef) {
            emptyFields.push('endMRef')
        }
        if(!startFRef) {
            emptyFields.push('startFRef')
        }
        if(!operatorF) {
            emptyFields.push('operatorF')
        }
        if(!endFRef) {
            emptyFields.push('endFRef')
        }

        if(emptyFields.length > 0) {
            return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
        } else {
            try {
                const condition = await Test.find({ testID: testID });
                const createdCategory = await Category.create({ categoryHeading,category,UOM,startMRef,operatorM,endMRef,startFRef,operatorF,endFRef,startBRef,operatorB,endBRef});
                
                if( !condition.length  ) { // Code to be executed if a test is created for the first time
                    test = await Test.create({ testID,outsourced,testName,shortName,specimen,price,heading,remarks });
                    test.subCategories.push(createdCategory)
                    test.save();
                    res.status(200).json(test);
                } else { // Code to be xecuted if a test is already present and test subcategories need to be added
                    test = await Test.findOne({ testID: testID });
                    test.subCategories.push(createdCategory)
                    await test.save();
                    test = await Test.findOne({ testID: testID })
                    .populate('subCategories');
                    console.log(test);
                    res.status(201).json(test);
                }
                
            } catch(error) {
                res.status(400).json({error: error.message})
            }
        }   
}

// Delete a test and its subcategories
const deleteTest = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    const test = await Test.findById(id)

    if(!test) {
        return res.status(400).json({error: "No such Test"})
    }

    await Category.remove({_id: { $in: test.subCategories }});

    const deletedTest = await Test.findOneAndDelete({_id: id}) ;

    res.status(200).json(deletedTest);
}

const updateTest = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    const test = await Test.findOneAndUpdate({_id: id }, {
        ...req.body
    });

    if(!test) {
        return res.status(400).json({error: "No such test"})
    }

    res.status(200).json(test)
}

module.exports = {
    getTests,
    getTest,
    createTest,
    deleteTest,
    updateTest
}