import './Eventos.css'
import {FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash} from "react-icons/fa"
import {useEffect, useState} from "react"
import {Container, Card, Row, Col, Button, Form, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import EventoService from '../../services/EventoService'

const eventoService = new EventoService ( )
function Eventos ( ) {
    const [listaEventos, setListaEventos] = useState([ ])
    const [termoBusca, setTermoBusca] = useState("")
    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value)
    }

    const handleFiltrar = async ( )=> {
        await listarEventos(termoBusca)
    }

    const listarEventos = async (termoBusca) => {
        let dados = []
        if(termoBusca) {
            dados = await eventoService.filtrar(termoBusca)
            setListaEventos(dados)
        } else {
            dados = await eventoService.obterTodos( )
            setListaEventos(dados)
        }

    }

    useEffect(( )=>{
        listarEventos ( )
    }, [ ])
/*         const listaSalva = localStorage.getItem('evento')
            if(listaSalva!=null) {
                setListaEventos(JSON.parse(listaSalva))
            } */


    const handleExcluir = async (id) => {
        if(window.confirm('Tem certeza que deseja excluir o evento?')) {
            await eventoService.delete(id)
            await listarEventos( )
        }
    }
/*         const novosEventos = listaEventos.filter(evento => evento.id!==id)
        setListaEventos(novosEventos)
        localStorage.setItem('evento',JSON.stringify(novosEventos)) */


    return (<>
        <h1><FaListAlt></FaListAlt> Eventos</h1>

        <Container>

        <Col lg='12'>
                <div className="d-grid">
                <Button size="lg" as={Link} to='/evento/novo' variant="primary"><FaPlusCircle></FaPlusCircle></Button>
                </div>
        </Col>

        <br></br>
        </Container>
        <Container>
        <Card>
            <Card.Header as="h4">Eventos cadastrados</Card.Header>
            <Card.Body>
            <Row lg='12'>
                <div className="d-grid">
                <Form.Control type="text" onChange={handleBuscaChange} placeholder="Título"></Form.Control>
                <Button onClick={handleFiltrar} variant="primary"><FaSearchPlus> Pesquisar</FaSearchPlus></Button>
                </div>
            </Row>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Título</th>
                    <th>Quantidade de pessoas</th>
                    <th>Data de Início</th>
                    <th>Data de Fim</th>
                    <th>Horário de Início</th>
                    <th>Horário de Fim</th>
                    <th><FaCog></FaCog></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaEventos.length<=0? "Nenhum evento registrado.":
                        listaEventos.map(evento=>(
                        <tr>
                            <td>{evento.id}</td>
                            <td>{evento.titulo}</td> 
                            <td>{evento.quantidade}</td>
                            <td>{evento.data}</td>
                            <td>{evento.datab}</td>
                            <td>{evento.hora}</td>
                            <td>{evento.horab}</td>
                            <td id="BotoesTabela">
                                <Link to = {`/eventos/${evento.id}`} className="btn btn-warning m-1"><FaEdit></FaEdit> Alterar</Link>
                                <Button onClick={( )=> handleExcluir(evento.id)} className="btn btn-danger m-1"><FaTrash></FaTrash> Excluír</Button>
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

export default Eventos