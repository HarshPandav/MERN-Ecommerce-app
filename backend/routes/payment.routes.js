const express = require('express')
const { createPayment, verifyPayment } = require('../controllers/payment.controller')

const router = express.Router()

router.post('/order', createPayment)
router.post('/verify', verifyPayment)

module.exports = router