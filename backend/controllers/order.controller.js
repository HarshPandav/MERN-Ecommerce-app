const Order = require("../models/order.model");
const sendEmail = require('../utils/sendEmail')

const createOrder = async (req, res) => {
    
    try{
        // console.log("Headers:", req.headers);
        // console.log("Body:", req.body);
        const { items, totalAmount, address, paymentId } = req.body
        
        if (!items || !totalAmount || !address) {
            return res.status(400).json({message: "Invalid order data"})
        }
        else{
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            await order.save()

            let message = `
            Hi ${req.user.name},
            Thank you for your order!
            Your order has been placed successfully and is now being processed.
            Order Summary:
            --------------------------
            Total Amount: ₹${totalAmount}
            Shipping Address:
            ${address.fullName}
            ${address.street}
            ${address.city}, ${address.postalCode}
            ${address.country}
            We'll notify you once your order has been shipped.
            Thank you for shopping with us!
            `;

            await sendEmail(req.user.email, "Order Created", message)
            res.status(201).json({message: "order created successfully", order})
        }

    }catch(error){
        console.log(error);
        
        res.status(500).json({message: "Error while creating order"})
    }
}

const myOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id}).populate('items.productId', 'name price')
        res.json(orders)
    }catch(error){
        res.status(500).json({message: "Error While fetching orders",error})
    }
}

const getOrders = async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user', 'id name')
        res.json(orders)
    }catch(error){
        res.status(500).json({message: "Error While fetching orders",error})
    } 
}

const updateOrderStatus = async (req, res) => {
    try {
        const {status} = req.body
        const order = await Order.findById(req.params.id)
        console.log(req.params.id);
        
        if (order) {
            order.status = status
            order.save()
            res.json({message: "Order status updated", order})
        }
        else{
            res.status(404).json({message: "order not found"})
        }
    } catch (error) {
        res.status(500).json({message: "Error while updating order status", error})
    }
}

module.exports = {createOrder, myOrders, getOrders, updateOrderStatus}