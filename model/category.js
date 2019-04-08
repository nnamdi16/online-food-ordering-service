//Import joi for validation
const Joi = require('joi');
const mongoose = require('mongoose');

//Create a schema/model for the food category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength:50
  }
});

const Category = mongoose.model('Category',categorySchema);

//validates the food category created 
const validateCategory = (category) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(category,schema);
};

exports.categorySchema = categorySchema;
exports.validate = validateCategory;
exports.Category = Category;