require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const foodRoutes = require('./routes/food')
const multer = require('multer');
// express app
const path = require('path');
const cors = require('cors');
const app = express()
 app.use(express.json());
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// route
app.use(cors());
app.use('/food', foodRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
  app.use(cors({
    origin: 'http://localhost:3000'
  }));