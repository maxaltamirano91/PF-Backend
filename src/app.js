const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
	next()
})

//* Middleware para parsear el cuerpo de la solicitud como raw para el webhook de Stripe

app.use('/payment/webhook', bodyParser.raw({ type: 'application/json' }))

app.use(router)

module.exports = app
