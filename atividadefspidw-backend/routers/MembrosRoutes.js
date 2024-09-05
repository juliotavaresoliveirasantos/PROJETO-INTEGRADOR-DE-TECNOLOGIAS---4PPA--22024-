const express = require('express');
const MembrosController = require('../controller/MembrosController');
const router = express.Router();

router.get('/', MembrosController.listar);
router.get('/:id', MembrosController.obterPorId);
router.post('/', MembrosController.adicionar);
router.put('/:id', MembrosController.atualizar);
router.delete('/:id', MembrosController.excluir);

module.exports = router;
