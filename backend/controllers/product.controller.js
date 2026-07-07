const product = require("../models/product.model");
const cloudinary = require('../config/cloudinary');

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

        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: "Product Not Found, Please try later"})
        }
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        const imageUrl = ''
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            console.log(result)            
            imageUrl = result.secure_url
        }
        const product = new product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        })
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body
        const product = await product.findById(req.params.id)

        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(result)            
                product.imageUrl = result.secure_url
            }
            
            const updateProduct = await product.save()
            res.status(201).json(updateProduct)
        }else{
            res.status(404).json({message: "Product not found"})
        }

    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
}

const deleteProduct = async (req, res) => {
    try{
        const product = await product.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({message: "Product deleted"})
        }else{
            res.status(404).json({message: "Product not found"})
        }
    }catch(error){
        res.status(500).json({message: "Server error"})
    }
}

module.exports = { getProduct, getProductById, createProduct, updateProduct, deleteProduct }