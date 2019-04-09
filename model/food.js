const Joi = require('joi');
const mongoose = require('mongoose');
const {
  categorySchema
} = require('./category');

const Food = mongoose.model('Food', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  },
  category: {
    type: categorySchema,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true
  },
  amountInStock: {
    type: Number,
    required:true
  }

}));

const validateFood = (food) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    categoryId: Joi.objectId().required(),
    description:Joi.string().min(5).max(1000),
    price:Joi.number().required(),
    amountInStock: Joi.number().required()
  };

  return Joi.validate(food,schema);
};

exports.Food = Food;
exports.validate = validateFood;