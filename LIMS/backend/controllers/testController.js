const Test = require('../models/testModel');
const Category = require('../models/categoryModel');
const Bill = require('../models/BillModel');
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
        // if(!endMRef && operatorM == ">") {
        //     endMRef = null
        // }
        if(!startFRef) {
            emptyFields.push('startFRef')
        }
        if(!operatorF) {
            emptyFields.push('operatorF')
        }
        if(!endFRef ) {
            emptyFields.push('endFRef')
        }
        // if(!endFRef && operatorF == ">") {
        //     endFRef = null
        // }

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
                } else { // Code to be executed if a test is already present and test subcategories need to be added
                    test = await Test.findOne({ testID: testID });
                    test.subCategories.push(createdCategory)
                    await test.save();
                    test = await Test.findOne({ testID: testID })
                    .populate('subCategories');
                    console.log(test);
                    res.status(201).json(test);
                }
                
            } catch(error) {
                res.status(401).json({error: error.message})
            }
        }   
}

// Delete a test and its subcategories
const deleteTest = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    try {
        const test = await Test.findById(id)

        if(!test) {
            return res.status(400).json({error: "No such Test"})
        }

        await Category.deleteMany({_id: { $in: test.subCategories }});

        const deletedTest = await Test.findOneAndDelete({_id: id}) ;

        res.status(200).json(deletedTest);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateTest = async(req,res) => {
    const { id } = req.params
    const { testID,outsourced,testName,shortName,specimen,price,heading,remarks} = req.body;
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

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
    } else {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "Not a vlid object ID"})
        }
    
        try {
            const test = await Test.findOneAndUpdate({_id: id }, {
                ...req.body
            });
        
            if(!test) {
                return res.status(400).json({error: "No such test"})
            }
        
            res.status(200).json(test)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
        
    }
}

const updateCategory = async(req,res) => {
    const { id } = req.params
    const {categoryHeading,category,UOM,startMRef,operatorM,endMRef,startFRef,operatorF,endFRef,startBRef,operatorB,endBRef } =  req.body;
    let emptyFields = []

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
    if(!startFRef) {
        emptyFields.push('startFRef')
    }
    if(!operatorF) {
        emptyFields.push('operatorF')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in the highlighted fields', emptyFields})
    } else {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "Not a vlid object ID"})
        }
    
        try {
            const category = await Category.findOneAndUpdate({_id: id }, {
                ...req.body
            });
        
            if(!category) {
                return res.status(400).json({error: "No such Category"})
            }
        
            res.status(200).json(category)
        } catch(error) {
            res.status(400).json({error: error.message})
        }
    }

}

const deleteCategory = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    try {
        const category = await Category.findById(id)

        if(!category) {
            return res.status(400).json({error: "No such Test"})
        }

        const deletedCategory = await Category.findOneAndDelete({_id: id}) ;

        res.status(200).json(deletedCategory);
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getTestCount = async(req,res) => {
    const { id } = req.params
    const Array = id.split(" ")
    const newID = Array[0]
    const Month = Number(Array[1])

    if(!mongoose.Types.ObjectId.isValid(newID)) {
        return res.status(404).json({error: "Not a vlid object ID"})
    }

    try {
        const test = await Test.findById(newID)

        if( Month !== 0 ) {
            if( test.outsourced === "No" ) {
                var testCount = await Bill.aggregate([
                {$project:{
                    month: {$month: '$createdAt'},
                    services: 1
                }},
                {$match:{
                    month: Month
                }},
                {$unwind: "$services"},
                {$match: {
                    'services': test.testName,}
                },
                { $count: 'Count' }
            ])
            } else {
                var testCount = await Bill.aggregate([
                    {$project:{
                        month: {$month: '$createdAt'},
                        outsourceServices: 1
                    }},
                    {$match:{
                        month: Month
                    }},
                    {$unwind: "$outsourceServices"},
                    {$match: {
                        'outsourceServices': test.testName,
                    }},
                    { $count: 'Count' }
                ])
            }
        } else {
            if( test.outsourced === "No" ) {
                var testCount = await Bill.aggregate([
                {$unwind: "$services"},
                {$match: {
                    'services': test.testName,}
                },
                { $count: 'Count' }
            ])
            } else {
                var testCount = await Bill.aggregate([
                    {$unwind: "$outsourceServices"},
                    {$match: {
                        'outsourceServices': test.testName,
                    }},
                    { $count: 'Count' }
                ])
            }
        }
        
        if( testCount.length > 0 ) {
            res.status(200).json(testCount[0].Count)
        } else {
            testCount = 0
            res.status(200).json(testCount)
        }
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {
    getTests,
    getTest,
    createTest,
    deleteTest,
    updateTest,
    updateCategory,
    deleteCategory,
    getTestCount
}