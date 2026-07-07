const express = require('express')
const protect = require('../middlewares/auth.middleware')
const {admin} = require('../middlewares/admin.middleware')
const multer = require('multer')
const { getProductById, getProduct, createProduct, deleteProduct, updateProduct } = require('../controllers/product.controller')

const upload = multer({dest: 'uploads/'})

const router = express.Router()
// get all products
router.route('/').get(getProduct).post(protect, admin, upload.single('image'), createProduct)
// get single product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct)

module.exports = router