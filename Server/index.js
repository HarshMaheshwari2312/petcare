const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
const morgan = require('morgan');

const categoryRoutes = require('./routes/category');
const petRoutes = require('./routes/pet');
const adoptionRoutes = require('./routes/adoption');
const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan('tiny'));

app.use('/public',express.static(path.join(__dirname,'public')));

app.use('/api/category',categoryRoutes);
app.use('/api/pets',petRoutes);
app.use('/api/adoption',adoptionRoutes);

const mongoUri = 'mongodb://localhost:27017/petscare';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongodb...");
  });
  
mongoose.connection.on("error", (err) => {
    console.log("Error connecting to mongo", err);
  });
app.listen(4000,()=>{
    console.log("App is running on Port 4000")
})