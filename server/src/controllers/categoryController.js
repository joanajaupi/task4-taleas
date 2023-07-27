const { default: mongoose } = require('mongoose');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const { body, validationResult} = require('express-validator');


module.exports.getAllCategories = async(req, res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    try{
        const categories = await Category.find().populate('products').exec();
        res.json(categories);
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }

}

module.exports.getCategoryById = async(req, res) =>{
    try{
        const categoryId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            res.status(400).json({message: "Invalid category id"});
            return;
        }
        const category = await Category.findById(categoryId).populate('products', ['productName', 'productPrice']).exec();
        if(category){
            res.json(category);
        }else{
            res.status(404).json({message:"Category not found"});
        }
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
}

module.exports.createCategory = async(req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        const category = new Category({
            categoryName: req.body.categoryName
        });
        await category.save();
        res.status(201).json(category);
        }catch(err){
        res.status(500).json({message:"Internal server error"});
        }
}

module.exports.updateCategory = async(req,res) =>{
    try{
        res.header('Access-Control-Allow-Origin', '*');
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        const updatedCategory = await Category.updateOne(
            {
                _id:req.params.id
            },
            {
                $set:{
                    categoryName: req.body.categoryName
                }
            }
        );
        res.status(200).json(updatedCategory);
    }catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports.deleteCategory = async(req,res) =>{
    try{
        res.header('Access-Control-Allow-Origin', '*');
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            res.status(400).json({message: "Invalid category id"});
            return;
        }
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if(!deletedCategory){
            res.status(404).json({message:"Category not found"});
        }else{
            //delete the products related to the category
            await Product.deleteMany({productCategory: req.params.id});
            res.send("Document deleted");
        }

    }catch(err){
        res.status(500).json({message:"Internal server error"});ö
    }
}

module.exports.validate = () => {
    return [
        body('categoryName').notEmpty().isAlpha().withMessage("Category name is required")
    ]
}	
