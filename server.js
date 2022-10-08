const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
// const fs = require("fs")
const { readdirSync } = require("fs")
require('dotenv').config();

// app
const app = express();




//database
require('./config/dbConnect')();



//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.json());
app.use(cors());

// routes middleware
// app.use('/api', authRoutes)
// fs.readdirSync('./routes').map((r) => console.log(r))
// fs.readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r)))
readdirSync('./routes').map((r) => app.use("/api", require('./routes/' + r)))



// route



// PORT
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on port! ${port}`))