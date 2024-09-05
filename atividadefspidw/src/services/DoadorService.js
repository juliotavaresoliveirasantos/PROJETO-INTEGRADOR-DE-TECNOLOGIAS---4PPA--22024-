const API_BASE_URL = 'http://localhost:3001'
class DoadorService {
    async obterTodos( ) {
        const response = await fetch(`${API_BASE_URL}/doador`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/doador/${id}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }

    async adicionar(doadorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doador`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(doadorDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao adicionar.')
                throw new Error('Erro ao cadastrar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async atualizar(idDoador, doadorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/doador/${idDoador}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(doadorDados)
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao atualizar.')
                throw new Error('Erro ao atualizar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async delete(idDoador) {
        try {
            const response = await fetch(`${API_BASE_URL}/doador/${idDoador}`,{
                method:'DELETE'
            })
            if(!response.ok) {
                console.log('Ocorreu um erro ao deletear.')
                throw new Error('Erro ao deletar o doador.')
            }
        } catch (error) {
            throw error
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/doador/filtrar/${termobusca}`,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) {
            console.log('Ocorreu um erro ao listar.')
        } else {
            const dados = await response.json( )
            return dados
        }
    }
}

export default DoadorService