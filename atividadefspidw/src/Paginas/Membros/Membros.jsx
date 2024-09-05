import { FaCog, FaEdit, FaListAlt, FaPlusCircle, FaSearchPlus, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import MembroService from '../../services/MembroService';

const membroService = new MembroService();

function Membros() {
    const [listaMembros, setListaMembros] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");

    const handleBuscaChange = (event) => {
        setTermoBusca(event.target.value);
    };

    const handleFiltrar = async () => {
        await listarMembros(termoBusca);
    };

    const listarMembros = async (termoBusca) => {
        let dados = [];
        if (termoBusca) {
            dados = await membroService.filtrar(termoBusca);
            setListaMembros(dados);
        } else {
            dados = await membroService.obterTodos();
            setListaMembros(dados);
        }
    };

    useEffect(() => {
        listarMembros();
    }, []);

    const handleExcluir = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir o membro?')) {
            await membroService.delete(id);
            await listarMembros();
        }
    };

    return (
        <>
            <h1><FaListAlt /> Membros</h1>

            <Container>
                <Col lg='12'>
                    <div className="d-grid">
                        <Button size="lg" as={Link} to='/membros/novo' variant="primary">
                            <FaPlusCircle /> Adicionar Membro
                        </Button>
                    </div>
                </Col>

                <br />

            </Container>
            <Container>
                <Card>
                    <Card.Header as="h4">Membros cadastrados</Card.Header>
                    <Card.Body>
                        <Row lg='12'>
                            <div className="d-grid">
                                <Form.Control
                                    type="text"
                                    onChange={handleBuscaChange}
                                    placeholder="Nome"
                                />
                                <Button onClick={handleFiltrar} variant="primary">
                                    <FaSearchPlus /> Pesquisar
                                </Button>
                            </div>
                        </Row>
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Função</th>
                                    <th><FaCog /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listaMembros.length <= 0 ? "Nenhum membro registrado." :
                                        listaMembros.map(membro => (
                                            <tr key={membro.id}>
                                                <td>{membro.id}</td>
                                                <td>{membro.nome}</td>
                                                <td>{membro.email}</td>
                                                <td>{membro.telefone}</td>
                                                <td>{membro.funcao}</td>
                                                <td id="BotoesTabela">
                                                    <Link to={`/membros/${membro.id}`} className="btn btn-warning m-1">
                                                        <FaEdit /> Alterar
                                                    </Link>
                                                    <Button onClick={() => handleExcluir(membro.id)} className="btn btn-danger m-1">
                                                        <FaTrash /> Excluir
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Membros;
