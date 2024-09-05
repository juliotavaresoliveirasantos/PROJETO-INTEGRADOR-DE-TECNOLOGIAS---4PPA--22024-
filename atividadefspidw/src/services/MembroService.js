const API_BASE_URL = 'http://localhost:3001';

class MembroService {
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/membro`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log('Ocorreu um erro ao listar os membros.');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/membro/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log('Ocorreu um erro ao obter o membro.');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(membroDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/membro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(membroDados)
            });
            if (!response.ok) {
                console.log('Ocorreu um erro ao adicionar o membro.');
                throw new Error('Erro ao cadastrar o membro.');
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idMembro, membroDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/membro/${idMembro}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(membroDados)
            });
            if (!response.ok) {
                console.log('Ocorreu um erro ao atualizar o membro.');
                throw new Error('Erro ao atualizar o membro.');
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(idMembro) {
        try {
            const response = await fetch(`${API_BASE_URL}/membro/${idMembro}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.log('Ocorreu um erro ao deletar o membro.');
                throw new Error('Erro ao deletar o membro.');
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/membro/filtrar/${termobusca}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            console.log('Ocorreu um erro ao listar os membros.');
        } else {
            const dados = await response.json();
            return dados;
        }
    }
}

export default MembroService;
