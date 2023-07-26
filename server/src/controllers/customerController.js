const customerModel = require('../models/customerModel');
const orderModel = require('../models/ordersModel');
const { body, validationResult} = require('express-validator');
module.exports.getAllCustomers = async(req, res) =>{
    //get all customers where isDeleted flag is false
    try{
        const customers = await customerModel.find({isDeleted: false}).populate('orders', ['_id', 'orderDate']).exec();
        res.json(customers);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.getCustomerById = async(req, res) =>{
    try{
        const customer = await customerModel.findById(req.params.id).populate('orders', ['_id', 'orderDate']).exec();
        if(customer){
            res.json(customer);
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.createCustomer = async(req, res) =>{

    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }

        const customer = new customerModel({
            customerName: req.body.customerName,
            customerEmail: req.body.customerEmail,
            customerPhone: req.body.customerPhone,
            customerPassword: req.body.customerPassword,        });
        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        res.status(500).json({error: err});
    }

}

module.exports.updateCustomer = async(req, res) =>{
    try{
        const updatedCustomer = await customerModel.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set:{
                    customerName: req.body.customerName,
                    customerEmail: req.body.customerEmail,
                    customerPhone: req.body.customerPhone,
                    customerPassword: req.body.customerPassword
            }
        }
        );
        res.status(200).json(updatedCustomer);
    }catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports.deleteCustomer = async(req, res) =>{
    //if for the customer the order is pending or cancelled then delete the customer and the order
    //if for the customer the order is delivered then soft delete the customer 
    try{
        const customer = await customerModel.findById(req.params.id);
        if(customer){
            const orders = await orderModel.find({customer: req.params.id});
            if(orders.length > 0){
                for(let i=0; i<orders.length; i++){
                    if(orders[i].orderStatus === "pending" || orders[i].orderStatus === "cancelled"){
                        await orderModel.findByIdAndDelete(orders[i]._id);
                    }else{
                        await customerModel.findOneAndUpdate(
                            {
                                _id: req.params.id
                            },
                            {
                                $set:{
                                    isDeleted: true
                                }
                            });
                    }
                }
                res.status(200).json({message: "Customer deleted"});
            }else{
                await customerModel.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Customer deleted"});
            }
        }else{
            res.status(404).json({message: "Customer not found"});
        }
    }
        catch(err){
            res.status(500).json({message: "Internal server error"});
        }

}



module.exports.validate = () => {
            return [
                body('customerName', 'Customer name is required').exists().matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
                body('customerEmail', 'Customer email is required').exists(),
                body('customerEmail', 'Customer email is not valid').isEmail(),
                body('customerPhone', 'Customer phone is required').exists().isInt(),
                body('customerPassword', 'Customer password is required').exists()
            ]
        }

