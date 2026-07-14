const Product = require("../models/product.model");
const cloudinary = require('../config/cloudinary');
const fs = require('fs')

const getProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

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
        let imageUrl = ''
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            // console.log(result)            
            imageUrl = result.secure_url
        }
        const product = new Product({
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
        const { name, description, price, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);

            product.imageUrl = result.secure_url;

            // file deletion in local
            await fs.promises.unlink(req.file.path);
        }

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
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