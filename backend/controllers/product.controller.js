const product = require("../models/product.model");
const cloudinary = require('../config/cloudinary')

const getProduct = async (req, res) => {
    try {
        const products = await product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await product.findById(req.params.id)

        if (condition) {
            res.json(products)
        } else {
            res.status(404).json({message: "Product Not Found, Please try later"})
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}