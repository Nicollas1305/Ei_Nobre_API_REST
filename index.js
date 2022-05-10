const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())


const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)



const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@einobre.zpkf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Conectado no MongoDB")
        app.listen(3000)
    })
    .catch((err) => console.log(err))