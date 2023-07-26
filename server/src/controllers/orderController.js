const orderModel = require('../models/ordersModel');
const customerModel = require('../models/customerModel');
const productModel = require('../models/productModel');
const { body, validationResult} = require('express-validator');
module.exports.getAllOrders = async(req, res) =>{
    try{
        const orders = await orderModel.find().populate('orderCustomer', 'customerName').populate('orderProducts', 'productName').exec(); //populate('orderProducts', 'productName') is used to get only productName from productModel	
        res.json(orders);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getOrderById = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id).populate('orderCustomer', 'customerName').populate('orderProducts', 'productName').exec();
        if(order){
            res.json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.createOrder = async(req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        const productIds = req.body.products; // Assuming req.body.products is an array of product IDs
    
        // Fetch the product objects from the database based on the IDs
        const products = await productModel.find({ _id: { $in: productIds } });
        const order = new orderModel({
            //order date when the order was placed, moment of making request
            orderDate: Date.now(),
            orderCustomer: req.body.customer,
            orderProducts: products
        });
        await order.save();
        const customer = await customerModel.findByIdAndUpdate(req.body.customer, {$push: {orders: order._id}});
        res.status(201).json(order);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.updateOrder = async(req, res) =>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        const updatedOrder =await orderModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set:{
                    customer: req.body.customer,
                    products: req.body.products
            }
        }
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.deleteOrder = async(req, res) =>{
    try{
        const deletedOrder = await orderModel.deleteOne({_id: req.params.id});
        res.status(200).json(deletedOrder);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.addProductToOrder = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id);
        if(order){
            //check if the added product is already in the order
            if(order.orderProducts.includes(req.body.products)){
                res.status(400).json({message: "Product already in the order"});
                return;
            }
            //check if the added product is in the database
            if((await productModel.findById(req.body.products)) == null){
                res.status(404).json({message: "Product not found"});
                return;
            }
            order.orderProducts.push(req.body.products);
            order.lastUpdate = Date.now();
            await order.save();
            res.status(200).json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json(err);
        console.log(err)
    }
}

module.exports.removeProductFromOrder = async(req, res) =>{
    try{
        const order = await orderModel.findById(req.params.id);
        if(order){
            order.orderProducts.pull(req.body.products);
            order.lastUpdate = Date.now();
            await order.save();
            res.status(201).json(order);
        }else{
            res.status(404).json({message: "Order not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}


module.exports.validate = (method) => {
    switch (method) {
      case 'createOrder': {
       return [ 
          body('customer', 'Customer ID is required').exists().isMongoId(),
          body('products', 'Products array is required').exists()
         ]   
      }
      case 'updateOrder': {
       return [ 
          body('customer', 'Customer ID is required').exists().isMongoId(),
          body('products', 'Products array is required').exists()
         ]   
      }
    }
  }