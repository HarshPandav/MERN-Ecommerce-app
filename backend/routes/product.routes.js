const express = require('express')
const protect = require('../middlewares/auth.middleware')
const {admin} = require('../middlewares/admin.middleware')

const router = express.Router()
// get all products
router.route('/').get(getProduct).post(protect, admin, createProduct)
// get single product
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

module.exports = router