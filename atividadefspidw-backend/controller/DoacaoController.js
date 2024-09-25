const DoacaoModel = require("../model/entidades/DoacaoModel");

const doacaoModel = new DoacaoModel( )
class DoacaoController {
    async obterTodos(req, res){
        const doacao = await doacaoModel.obterTodos( )
        return res.status(200).json(doacao)
    }
    
    async obterPorId(req, res){
        const id = req.params.id
        const doacao = await doacaoModel.obterPorId(id)
        return res.status(200).json(doacao)
    }

    async adicionar(req, res){
        const {nome, cpf, tipo,telefone, descricao,  membro} = req.body
        const doacao = new DoacaoModel (0,nome, cpf, tipo,telefone, descricao,  membro)

        try {
            await doacaoModel.adicionar(doacao)
            return res.status(201).json({message:'Cadastrado com sucesso!'})
        } catch (error) {
            console.log('Erro ao cadastrar o doação: ' + error)
            res.status(500).json({error: 'Erro ao cadastrar doação'})
        }
    }

    async atualizar(req, res){
        const id = req.params.id
        const  {nome, cpf, tipo,telefone, descricao,  membro} = req.body
        const doacao = new DoacaoModel (nome, cpf, tipo,telefone, descricao,  membro)

        try {
            await doacaoModel.atualizar(id, doacao)
            return res.status(201).json({message:'Atualizado com sucesso!'})
        } catch (error) {
            console.log('Erro ao atualizar o doador: ' + error)
            res.status(500).json({error: 'Erro ao atualizar doador'})
        }
    }
    
    async excluir(req, res) {
        const id = req.params.id
        try {
            await doacaoModel.delete(id)
            res.status(200).json({message:'Excluído com sucesso.'})
        } catch (error) {
            console.log('Erro ao excluir  doacao', error)
            res.status(500).json({error: 'Erro ao excluir  doação'})
        }
    }

    async filtrar(req, res){
        const termobusca = req.params.termobusca
        const  doacoes = await  doacaoModel.filtrar(termobusca)
        return res.status(200).json( doacoes)
    }
}

module.exports = DoacaoController