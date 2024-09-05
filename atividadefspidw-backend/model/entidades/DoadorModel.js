const Database = require("../database")

const database = new Database( )
class DoadorModel {
    constructor(id, nome, cpf, genero,telefone, email, endereco, membro){
        this.id = id
        this.nome = nome
        this.cpf = cpf
        this.genero = genero
        this.telefone = telefone
        this.email = email
        this.endereco = endereco
        this.membro = membro
    }

    async obterTodos( ){
        const listaDoadores = await database.ExecutaComando('select * from doadores ORDER BY nome')
        return listaDoadores
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from doadores where id=? ',[id])
        return result[0]
    }

    async adicionar(dadosDoador){
        await database.ExecutaComandoNonQuery('insert into doadores set ?',dadosDoador)
    }

    async atualizar(id, dadosDoador){
        await database.ExecutaComandoNonQuery('update doadores set ? where id = ?',[
            dadosDoador,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from doadores where id = ?',[id])
    }

    async filtrar (termobusca) {
        const doadores = await database.ExecutaComando('select * from doadores where nome like ?',
            [`%${termobusca}%`]
        )
        return doadores
    }
}

module.exports = DoadorModel