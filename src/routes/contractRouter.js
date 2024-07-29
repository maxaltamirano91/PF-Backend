const { Router } = require('express')
const contractRouter = Router()
const {
    createContract,
    getAllContracts,
    getContractById,
    deleteContractById,
} = require('../handlers/contract-handler')

const { verifyToken } = require('../middlewares/auth-middleware')

contractRouter.get('/', verifyToken, getAllContracts)
contractRouter.get('/:id', verifyToken, getContractById)
contractRouter.post('/', verifyToken, createContract)
contractRouter.delete('/:id', verifyToken, deleteContractById)

module.exports = contractRouter