const express = require('express')
const ProductsService = require('../services/products.service')
const {validatorHandler} = require('../middlewares/validator.handler')
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/products.schema')

const router = express.Router()
const service = new ProductsService

//get all products
router.get('/', (req, res) => {
  // const {offset = 20, page = 1 } = req.query
  service.listProducts()
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      console.log("🚀 ~ router.get ~ err:", err);
    });
})

//get one product by id
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) =>
{
  const { id } = req.params
  try {
    const productSelected = await service.findOne(id)
    if(productSelected) {
      res.send(res.json(productSelected))
    }
  } catch (error) {
    next(error)
  }


})

//create product
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res) =>
{
  const body = req.body
  res.send(res.status(201).json({
    message: 'Producto Creado Correctamente',
    data: service.createProduct(body)
  }))
})

//update product
router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res) =>
{
  const {id} = req.params
  const body = req.body
  const productToReturn = service.update(id, body)
  if(productToReturn) {
    res.send(res.json({
      message: 'Producto Creado Correctamente',
      data: productToReturn
    }))
  } else {
    res.send(res.json({
      message: 'El Producto no existe',
    }))
  }
})

//delete product
router.delete('/:id', (req, res) => {
  const {id} = req.params
  res.send(res.json({
    message: 'Producto ' + id + ' eliminado Correctamente',
  }))
})

module.exports = router
