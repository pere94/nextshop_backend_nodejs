const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom')
// const pool = require('../libs/postgres.pool') // sequelize ya maneja pool
const sequelize = require('../libs/sequelize') // sequelize ya maneja pool

class ProductsService {

  constructor() {
    this.products = this.generateProducts()
  }

  generateProducts() {
    const products = []
    for (let i = 0; i < 100; i++) {
      products.push(
        {
          id: i,
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseInt(faker.commerce.price()),
          image: faker.image.imageUrl(),
        })
      }
    return products
  }

  async listProducts() {
    //-------- con pool --------------------
    const query = 'SELECT * FROM tasks'
    const [data] = await sequelize.query(query)
    return data
    //----------------------------------------------------------------
    // const productsPerPage = offset ? offset : 20
    // const currentPage = page ? page : 1
    // const arrayToReturn = this.products.slice(productsPerPage * currentPage - productsPerPage, productsPerPage * currentPage)
    // ------ sin pool--------------
    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM tasks');
    // return res.rows
    //--------------------------
    // return {
    //   total_products: this.products.length,
    //   data: arrayToReturn,
    //   products_per_page: productsPerPage ? productsPerPage : 20,
    //   current_page: currentPage ? currentPage : 1,
    //   last_page: Math.ceil(this.products.length/productsPerPage),
    // }
  }

  async findOne(ID) {
    const productToReturn = this.products.find(item =>  item.id == ID)
    if(productToReturn) {
      return productToReturn
    } else {
      throw boom.notFound('Product not found')
    }
  }

  createProduct(productInfo) {
    this.products.push({
      id: parseInt(this.products.sort((a, b) => (b.id - a.id)).length) + 1,
      name: productInfo.name ? productInfo.name : '',
      description: productInfo.description ? productInfo.description : '',
      price: productInfo.price ? productInfo.price : '',
      image: productInfo.image ? productInfo.image : '',
    })
    return {
      id: parseInt(this.products.sort((a, b) => (b.id - a.id)).length) + 1,
      name: productInfo.name ? productInfo.name : '',
      description: productInfo.description ? productInfo.description : '',
      price: productInfo.price ? productInfo.price : '',
      image: productInfo.image ? productInfo.image : '',
    }
  }


  update(id, newProductInfo) {
    const productToUpdate = this.products.filter(product => product.id == id).length > 0
      ? this.products.filter(product => product.id == id)[0]
      : null
    if(productToUpdate) {
      return {
        id: productToUpdate.id,
        name: newProductInfo.name ? newProductInfo.name : productToUpdate.name,
        description: newProductInfo.description ? newProductInfo.description : productToUpdate.description,
        price: newProductInfo.price ? newProductInfo.price : productToUpdate.price,
        image: newProductInfo.image ? newProductInfo.image : productToUpdate.image,
      }
    } else {
      throw boom.notFound('Product not found')
    }
  }

  delete(ID) {
    const productsToReturn = this.products.filter(product => product.id !== ID)
    if(productsToReturn.length > 0) {
      return productsToReturn
    } else {
      throw boom.notFound('Product not found')
    }
  }

}

module.exports = ProductsService
