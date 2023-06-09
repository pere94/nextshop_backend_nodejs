// npm i nodemon eslint eslint-config-prettier eslint-plugin-prettier prettier -D
// npm i express

const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')
const os = require('os')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handlers')

const IP = os.networkInterfaces().eth0[0].address
const app = express()
const port = 3000

app.use(express.json())

const whiteList = ['http://172.20.135.86:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(corsOptions))


app.get('/', (req, res) => {
  res.send('Welcome')
})


routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`
    Server montado en: http://${IP}:${port}/api/v1/products
  `)
})

