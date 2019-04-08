const mongoose = require('mongoose');
const express = require('express');
const app = express();
const category = require('./route/category');
const food = require('./route/food');

require('./startup/validation')();

//Register middleware function
app.use(express.json());
app.use('/api/category',category);
app.use('/api/food',food);

//Connect to our mongodb database
mongoose.connect('mongodb://localhost/online-food-services')
.then(()=> console.log('Connected to MongoDb ...'))
.catch(err => console.error('Could not connect to MongoDB',err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));