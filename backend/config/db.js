const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connected")
    } catch (error) {
        console.log("DataBase connection Error: ",error);
        process.exit(1)
    }
}

module.exports = connectDB