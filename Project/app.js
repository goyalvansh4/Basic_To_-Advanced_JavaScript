const express = require('express');
const app = express();
const categoriesRouter = require('./Routes/categories');

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/learningPlatform')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err)); 


app.use(categoriesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ', port);
});