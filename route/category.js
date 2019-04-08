const {
  validate,
  Category
} = require('../model/category');
//Import express
const express = require('express');
// Creates endpoints for responding to client's request
const router = express.Router();

// const food = [];

//GET method route for viewing all food categories
router.get('/', async (req, res) => {
  const category = await Category.find().sort('name');
  res.send(category);
});

//Endpoint for creating new category
router.post('/', async (req, res) => {
  //Check if error exist during request
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Creates new categories
  let category = new Category({
    name: req.body.name
  });
  category = await category.save();
  // await food.push(category);

  res.send(category);
});


//Endpoint for updating a category

//Endpoint for updating  category
router.put('/:id', async (req, res) => {
  //Catch errors and send the info to the client
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Search the database for a the food category id requested.
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  //If the food id does not exist an error info is returned
  if(!category) res.status(404).send('The food category with the given ID does not exist');

  //response sent when the food category exist
  res.send(category);
});

//Endpoint for deleting a particular food category
router.delete('/:id', async(req,res) => {
  //Search if the category to be deleted exist
  const category = await Category.findByIdAndRemove(req.params.id);

  //Returns a 404 status if the food category doen not exist
  if(!category) return res.status(404).send('The food category with the given Id does not exist');
  //Returns the category if it exist 
  res.send(category);
});

//Endpoint to search for a particular food category

router.get('/:id', async(req,res) => {
  //Search for the food category based on id
  const category = await Category.findById(req.params.id);
  
  if(!category) return res.satatus(404).send('The food category with the givenId does not exist');

  res.send(category);

});

module.exports = router;