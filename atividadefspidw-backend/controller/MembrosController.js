const MembroService = require('../services/MembroService');

class MembrosController {
    async listar(req, res) {
        try {
            const membros = await MembroService.obterTodos();
            res.status(200).json(membros);
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar membros.", error });
        }
    }

    async obterPorId(req, res) {
        try {
            const { id } = req.params;
            const membro = await MembroService.obterPorId(id);
            if (membro) {
                res.status(200).json(membro);
            } else {
                res.status(404).json({ message: "Membro não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter membro.", error });
        }
    }

    async adicionar(req, res) {
        try {
            const novoMembro = req.body;
            const membroCriado = await MembroService.adicionar(novoMembro);
            res.status(201).json(membroCriado);
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar membro.", error });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const membroAtualizado = await MembroService.atualizar(id, req.body);
            if (membroAtualizado) {
                res.status(200).json(membroAtualizado);
            } else {
                res.status(404).json({ message: "Membro não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar membro.", error });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await MembroService.excluir(id);
            if (sucesso) {
                res.status(200).json({ message: "Membro excluído com sucesso." });
            } else {
                res.status(404).json({ message: "Membro não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao excluir membro.", error });
        }
    }
}

module.exports = new MembrosController();
