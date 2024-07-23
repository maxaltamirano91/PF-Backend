const { Router } = require('express')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const projectsRouter = require('./projectRouter')
const techRouter = require('./techRouter')
const mercadoPagoRouter = require('./mercadoPagoRouter')
const tagRouter = require('./tagRouter')

const { verifyToken } = require('../middlewares/auth-middleware')

const router = Router()
router.use('/', authRouter)
router.use('/projects', projectsRouter)
router.use('/technologies', techRouter)
router.use('/users', verifyToken, usersRouter)
router.use('/payment', mercadoPagoRouter)
router.use('/tags', tagRouter)

module.exports = router
