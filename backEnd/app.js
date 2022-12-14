const express = require('express');
const app = express();
const errormiddleware = require('./middleware/error'); 
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require('dotenv');

//config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


//route

const products = require('./routes/productRoutes')
const user = require('./routes/userRoutes')
const order = require('./routes/orderRoutes')
// const payment = require('./routes/paymentRoute');
const payment = require('./routes/paymentRoutes');

app.use("/api/v1",products)
app.use("/api/v1/",user)
app.use("/api/v1/",order)
app.use("/api/v1/", payment); 


//middleware

app.use(errormiddleware)

module.exports = app