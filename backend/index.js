require("dotenv").config()
const express = require("express")
const cors = require('cors')
const connectDB = require("./config/db")
const authRouter = require('./routes/auth.routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

connectDB()

const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("we are good to go !");
})

app.use('/api/auth',authRouter)

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})