import {FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash} from "react-icons/fa"
import {useEffect, useState} from "react"
import {Container, Card, Row, Col, Button, Form, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import DoacaoService from '../../services/DoacaoService'

const doacaoService = new DoacaoService ( )

function Doacao ( ) {
    const [listaDoacoes, setListaDoacoes] = useState([ ])
    const [termoBusca, setTermoBusca] = useState("")
    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async ( )=> {
        await listarDoacoes(termoBusca)
    }

    const listarDoacoes = async (termoBusca) => {
        let dados = []
        if(termoBusca) {
            dados = await doacaoService.filtrar(termoBusca)
            setListaDoacoes(dados)
        } else {
            dados = await doacaoService.obterTodos( )
            setListaDoacoes(dados)
        }

    }

    useEffect(( )=>{
        listarDoacoes ( )
    }, [ ])
/*         const listaSalva = localStorage.getItem('evento')
            if(listaSalva!=null) {
                setListaEventos(JSON.parse(listaSalva))
            } */


    const handleExcluir = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir a doação?')) {
            await doacaoService.delete(id)
            await listarDoacoes( )
        }
    }
/*         const novosEventos = listaEventos.filter(evento => evento.id!==id)
        setListaEventos(novosEventos)
        localStorage.setItem('evento',JSON.stringify(novosEventos)) */


    return (<>
        <h1><FaListAlt></FaListAlt> Doações</h1>

        <Container>

        <Col lg='12'>
                <div className="d-grid">
                <Button size="lg" as={Link} to='/doacoes/novo' variant="primary"><FaPlusCircle></FaPlusCircle></Button>
                </div>
        </Col>

        <br></br>
        </Container>
        <Container>
        <Card>
            <Card.Header as="h4">Doações cadastradas</Card.Header>
            <Card.Body>
            <Row lg='12'>
                <div className="d-grid">
                <Form.Control type="text" onChange={handleBuscaChange} placeholder="Nome"></Form.Control>
                <Button onClick={handleFiltrar} variant="primary"><FaSearchPlus> Pesquisar</FaSearchPlus></Button>
                </div>
            </Row>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Tipo</th>
                    <th>Telefone</th> 
                    <th>Descrição</th>
                    <th>Membro</th>
                    <th><FaCog></FaCog></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaDoacoes.length<=0? "Nenhuma doação registrada.":
                        listaDoacoes.map(doacao=>(
                        <tr>
                            <td>{doacao.id}</td>
                            <td>{doacao.nome}</td> 
                            <td>{doacao.cpf}</td>
                            <td>{doacao.tipo}</td>
                            <td>{doacao.telefone}</td>
                            <td>{doacao.descricao}</td>
                            <td>{doacao.membro}</td>
                            <td id="BotoesTabela">
                                <Link to = {`/doacoes/${doacao.id}`} className="btn btn-warning m-1"><FaEdit></FaEdit> Alterar</Link>
                                <Button onClick={( )=> handleExcluir(doacao.id)} className="btn btn-danger m-1"><FaTrash></FaTrash> Excluir</Button>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </Table>
            </Card.Body>
        </Card>
        </Container>
    </>)
}

export default Doacao