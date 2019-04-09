const {Food,validate} = require('../model/food');
const {Category} = require('../model/category');
const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');

//Endpoint to get all food in the restaurant
router.get('/',async(req,res) => {
  const food = await Food.find().sort('name');
  res.send(food);
});

//Endpoint add new food to the database
router.post('/', async(req,res) => {
  //Check if the food is valid
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Test if the food categoryId is valid
  const category = await Category.findById(req.body.categoryId);
  if(!category) return res.status(400).send('Invalid category Id ');

  //Create an instance of the food 
  const food = new Food ({
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name
    },
    description:req.body.description,
    price:req.body.price,
    amountInStock: req.body.amountInStock
  });
 await food.save();

  res.send(food);

});

//Endpoint for updating food
router.put('/:id', async(req,res) => {
  //Check if input is valid
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //Check if the category exist based on the categoryId
  const category = await Category.findById(req.body.categoryId);
  if(!category) return res.status(400).send('Invalid category');

  //Search for food with the foodId supplied and  update it
  const food = await Food.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    category: {
      _id: category._id,
      name: category.name
    },
    description:req.body.description,
    price:req.body.price,
    amountInStock: req.body.amountInStock
  }, {new :true});

  //Returns error when the food doesn't exist in the record
  if(!food) return res.status(404).send(`The food with the given Id does not exist`);
  res.send(food);
});

//Endpoint to delete a particular food in the database
router.delete('/:id', async(req,res)=> {
  //Search for the food by it's Id and remove it
  const food = await Food.findByIdAndRemove(req.params.id);
  if(!food) return res.status(404).send(`The food with the given Id does not exist`);
  res.send(food);
});

//Endpoint to get a particular food in the database
router.get('/:id', async(req,res) => {
  const food = await Food.findById(req.params.id);
  if(!food) return res.status(404).send(`The food with the given Id does not exist`);
  res.send(food);
});

module.exports = router;