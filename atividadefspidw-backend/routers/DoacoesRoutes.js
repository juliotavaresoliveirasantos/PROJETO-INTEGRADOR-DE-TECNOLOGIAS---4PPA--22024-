const DoacaoController = require('../controller/DoacaoController.js')
const doacaoController = new DoacaoController( )
const express = require('express')
const router = express.Router( )
router.get('/doacoes', doacaoController.obterTodos)
router.get('/doacoes/:id', doacaoController.obterPorId)
router.post('/doacoes', doacaoController.adicionar)
router.put('/doacoes/:id',doacaoController.atualizar)
router.delete('/doacoes/:id', doacaoController.excluir)
router.get('/doacoes/filtrar/:termobusca',doacaoController.filtrar)

module.exports = router