const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// app
const app = express();




// db
mongoose.connect(process.env.DATABASE, {    //contacts-db => documents     and table = collection
    useNewUrlParser: true,
    // userCreateIndex: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection
// console.log(db);
db.on('error', (err) => {
    console.log(err);
    console.log('this is error');
})
db.once('open', () => {
    console.log("database connection done  ");
})



//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(express.json());
app.use(cors());


// route
app.get('/api', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})



// PORT
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port! ${port}`))