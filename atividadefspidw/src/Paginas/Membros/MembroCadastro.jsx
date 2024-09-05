import { Container, Card, Button, Col, Form, Alert, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import MembroService from '../../services/MembroService';

const membroService = new MembroService();

function MembroCadastro() {
    const [sucessoMensagem, setSucessoMensagem] = useState('');
    const [validated, setValidated] = useState(false);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [genero, setGenero] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [endereco, setEndereco] = useState('');
    const [ativo, setAtivo] = useState('');
    const [errors, setErrors] = useState({});
    const { idMembro } = useParams();

    useEffect(() => {
        const obterMembro = async () => {
            const dados = await membroService.obterPorId(idMembro);
            setNome(dados.nome);
            setCpf(dados.cpf);
            setGenero(dados.genero);
            setTelefone(dados.telefone);
            setEmail(dados.email);
            setEndereco(dados.endereco);
            setAtivo(dados.ativo);
        };
        if (idMembro !== undefined) {
            obterMembro();
        }
    }, [idMembro]);

    const handleChange = (setter, validator) => (e) => {
        const value = e.target.value;
        setter(value);
        if (validator) {
            validator(value);
        }
    };

    const handleSalvar = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let newErrors = {};

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        if (!nome) newErrors.nome = 'Nome do membro não pode estar vazio.';
        if (!cpf) newErrors.cpf = 'CPF não pode estar vazio.';
        if (!genero) newErrors.genero = 'Gênero não pode estar vazio.';
        if (!ativo) newErrors.ativo = 'Ativo é um campo obrigatório.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const membro = {
                nome,
                cpf,
                genero,
                telefone,
                email,
                endereco,
                ativo
            };

            if (idMembro === undefined) {
                await membroService.adicionar(membro);
                setSucessoMensagem('Membro cadastrado com sucesso!');
            } else {
                await membroService.atualizar(idMembro, membro);
                setSucessoMensagem('Membro atualizado com sucesso!');
            }
        }

        setValidated(true);
    };

    return (
        <>
            <Button variant="secondary" as={Link} to="/membros"><FaArrowLeft /> Voltar</Button>
            <br /><br />

            <Container className="mt-5">
                <Card>
                    <Card.Header>
                        <h1><FaFileUpload /> Cadastro de Membro {idMembro}</h1>
                    </Card.Header>
                    <Card.Body>
                        <Form noValidate validated={validated} onSubmit={handleSalvar}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="nomeMembro">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            value={nome}
                                            type="text"
                                            onChange={handleChange(setNome, (val) => {
                                                if (!val) setErrors((prev) => ({ ...prev, nome: 'Nome é obrigatório.' }));
                                            })}
                                            isInvalid={!!errors.nome}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Replicating for CPF, Gênero, Telefone, Email, Endereço, and Ativo */}
                            {/* Similar to the Nome input */}

                            <Button type="submit" variant="success"><FaRegSave /> Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {sucessoMensagem && <Alert variant="success"><FaCheckCircle /> {sucessoMensagem}</Alert>}
        </>
    );
}

export default MembroCadastro;
