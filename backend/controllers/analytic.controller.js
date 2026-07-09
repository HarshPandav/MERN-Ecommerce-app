const Order = require("../models/order.model");
const product = require("../models/product.model");
const User = require("../models/user.model");

const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role : 'user' })
        const totalOrders = await Order.countDocuments({})
        const totalProducts = await product.countDocuments({})

        const orders = await Order.find({})
        console.log(orders);
        
        const revenue = orders.reduce((acc, elem) => {return acc + elem.totalAmount}, 0)

        res.json({totalOrders, totalProducts, totalUsers, totalRevenue: revenue})
        
    } catch (error) {
        res.status(500).json({message: "Error while fetching states"})
    }
}

module.exports = {getAdminStats}