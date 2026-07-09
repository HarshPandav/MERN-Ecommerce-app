const express = require('express')
const protect = require('../middlewares/auth.middleware')
const {admin} = require('../middlewares/admin.middleware')
const { createOrder, getOrders, myOrders, updateOrderStatus } = require('../controllers/order.controller')

const router = express.Router()

router.route('/').post(protect, createOrder).get(protect, admin, getOrders)
router.route('/myorders').get(protect, myOrders)
router.route('/:id/status').put(protect, admin, updateOrderStatus)

module.exports = router