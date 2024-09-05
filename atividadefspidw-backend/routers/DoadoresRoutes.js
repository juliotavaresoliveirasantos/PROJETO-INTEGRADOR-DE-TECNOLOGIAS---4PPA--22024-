const DoadorController = require('../controller/DoadorController.js')
const doadorController = new DoadorController( )
const express = require('express')
const router = express.Router( )
router.get('/doador', doadorController.obterTodos)
router.get('/doador/:id', doadorController.obterPorId)
router.post('/doador', doadorController.adicionar)
router.put('/doador/:id', doadorController.atualizar)
router.delete('/doador/:id', doadorController.excluir)
router.get('/doador/filtrar/:termobusca', doadorController.filtrar)

module.exports = router