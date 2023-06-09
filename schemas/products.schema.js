const joi = require('joi');

const id = joi.number().positive()
const name = joi.string().min(3).max(30)
const description = joi.string().min(3).max(500)
const price = joi.number().positive().min(10)
const image = joi.string().uri()

const createProductSchema = joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
})

const updateProductSchema = joi.object({
  name: name,
  description: description,
  price: price,
  image: image,
})

const getProductSchema = joi.object({
  id: id.required(),
})

module.exports = {createProductSchema, updateProductSchema, getProductSchema}
