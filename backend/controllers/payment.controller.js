require('dotenv').config()
const Razorpay = require('razorpay')
const crypto = require('crypto')

const createPayment = async (req, res) => {
    try {
        if (!req.body.amount) {
            return res.status(400).json({
                message: "Amount is required"
            });
        }
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_API,
            key_secret: process.env.RAZORPAY_API_SECRET
        });
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }

        const order = await instance.orders.create(options)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature === razorpay_signature) {
            return res.status(200).json({
                success: true,
                message: "Payment Verified Successfully"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid Payment"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {createPayment, verifyPayment}