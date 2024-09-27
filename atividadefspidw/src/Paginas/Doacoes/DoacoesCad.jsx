
import {Container, Card, Button, Col, Form, Alert, Row} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {FaArrowLeft, FaCheckCircle, FaFileUpload, FaRegSave} from "react-icons/fa"
import {Link, useParams} from "react-router-dom"
import DoacaoService from '../../services/DoacaoService'

const doacaoService = new DoacaoService( )
function DoacaoCadastro ( ) {
    const [sucessoMensagem, setSucessoMensagem] = useState('')
    const [validated, setValidated] = useState(false)
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const [tipo, setTipo] = useState("")
    const [telefone, setTelefone] = useState("")
    const [descricao, setDesc] = useState("")
    const [membro, setMembro] = useState("")
    const [errors, setErrors] = useState({ })
    const {idDoacao} = useParams( )

    useEffect(( )=> {
        const obterDoacao = async ()=> {
            const dados = await doacaoService.obterPorId(idDoacao)
            console.log('dados',dados)
            setNome(dados.nome)
            setCpf(dados.cpf)
            setTipo(dados.tipo)
            setTelefone(dados.telefone)
            setDesc(dados.descricao)
            setMembro(dados.membro)
        }
        if(idDoacao!==undefined){
         obterDoacao()
        }
    })

    const handleNomeChange = (e) => {
        const value = e.target.value
            setNome(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,nome:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,nome:'Nome do doador não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleCpfChange = (e) => {
        const value = e.target.value
            setCpf(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,cpf:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,cpf:'CPF não pode estar vazio.'}))
                }
            }
    }


    const handleTipoChange = (e) => {
        const value = e.target.value
            setTipo(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,tipo:null}))
            } else {
                if(value===""){
                    setErrors((prev)=>({...prev,genero:'Tipo não pode estar vazio.'}))
                }
            }
    }

    const handleTelefoneChange = (e) => {
        const value = e.target.value
            setTelefone(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,telefone:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,telefone:'Telefone não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,telefone:'Telefone não pode exceder 50 caracteres.'}))
                }
            }
    }

    const handleDescricaoChange = (e) => {
        const value = e.target.value
            setDesc(value)
            if(value && value.length<=50) {
                setErrors((prev)=>({...prev,descricao:null}))
            } else {
                if(value==="") {
                    setErrors((prev)=>({...prev,descricao:'Descrição não pode estar vazio.'}))
                } else {
                    setErrors((prev)=>({...prev,descricao:'Descricão não pode exceder 50 caracteres.'}))
                }
            }
    }
    const handleMembroChange = (e) => {
        const value = e.target.value;
        setMembro(value);
        if (!value) {
            setErrors(prev => ({ ...prev, membro: 'Membro é um campo obrigatório.' }));
        } else {
            setErrors(prev => ({ ...prev, membro: null }));
        }
    };

    async function handleSalvar(event) {
            event.preventDefault( )
            const form = event.currentTarget
            let newErrors = { }

            if(form.checkValidity( )===false) {
                event.stopPropagation( )
            }

            if(!nome) {
                newErrors.nome='Nome do doador não pode estar vazio.'
            } else if(nome.length>50) {
                newErrors.nome='Nome do doador não pode exceder 50 caracteres.'
            }

            if (!cpf) {
                newErrors.cpf='CPF não pode estar vazio.'
            }

            if (!tipo) {
                newErrors.tipo='Tipo não pode estar vazio.'
            }

            if (!membro) {
                newErrors.membro='Membro não pode estar vazio.'
            }


            if(Object.keys(newErrors).length>0) {
                setErrors(newErrors)
            } else {
                const doacao = {
                    
                    nome,
                    cpf,
                    tipo,
                    telefone,
                    descricao,
                    membro
                }
                console.log('doacao',doacao)

                if(idDoacao===undefined) {
                    await doacaoService.adicionar(doacao)
                    setSucessoMensagem('Doação cadastrado com sucesso!')
                } else {
                    await doacaoService.atualizar(idDoacao, doacao)
                    setSucessoMensagem('Doação atualizada com sucesso!')
                }

                
/*              const listaSalva = localStorage.getItem('evento')
                const eventos = listaSalva==null?[ ]:JSON.parse(listaSalva)
                evento.id = eventos.length+1
                eventos.push(evento)
                localStorage.setItem('evento',JSON.stringify(eventos)) */
            }
        setValidated(true)
    }

    return (<>
    <Button variant="secondary" as={Link} to='/doacoes'><FaArrowLeft></FaArrowLeft> Voltar</Button>
    <br></br>
    <br></br>

    <Container className="mt-5">
    <div id="CardCadastroDoacao">
    <Card>
    <Card.Header>
            <h1><FaFileUpload></FaFileUpload> Cadastro de doação {idDoacao}</h1>
    </Card.Header>


    <Card.Body>
    <Form noValidate validated={validated} onSubmit={handleSalvar}>

        <Row>
        <Col id="ColInfoDoador">
            <Col>
            <Form.Group controlId="nomeDoacao">
                <Form.Label>Nome</Form.Label>
                    <Form.Control
                        defaultValue={nome}
                        type="text"
                        id="nomeDoacao"
                        required
                        onChange={handleNomeChange}
                        isInvalid={!!errors.nome}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nome}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>


            <Col>
            <Form.Group controlId="cpfDoacao">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                        defaultValue={cpf}
                        type="cpf"
                        id="cpfDoacao"
                        required
                        onChange={handleCpfChange}
                        isInvalid={!!errors.cpf}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.cpf}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="tipoDoacao">
                <Form.Label>Tipo</Form.Label>
                    <Form.Select defaultValue={tipo} onChange={handleTipoChange} required aria-label="Default select example">
                        <option value="" hidden selected>Selecione o tipo</option>
                        <option value="dinheiro ">Dinheiro</option>
                        <option value=" objeto">Objeto</option>
                        <option value=" outros">Outros</option>
                        
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione o tipo da doação
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="telefoneDoacao">
                <Form.Label>Telefone</Form.Label>
                    <Form.Control
                        defaultValue={telefone}
                        type="tel"
                        id="telefoneDoacao"
                        required
                        onChange={handleTelefoneChange}
                        
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.telefone}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            

            <Col>
            <Form.Group controlId="descricaoDoacao">
                <Form.Label>Descrição</Form.Label>
                    <Form.Control
                    type="desc"
                    id="descricaoDoacao"
                    required
                    defaultValue={descricao}
                    onChange={handleDescricaoChange}
                   
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.descricao}
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

            <Col>
            <Form.Group controlId="membroDoacao">
                <Form.Label>Membro</Form.Label>
                <Form.Select value={membro} onChange={handleMembroChange} required>
    <option value="" hidden>Selecione</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
</Form.Select>
                    <Form.Control.Feedback type="invalid">
                            Selecione se o doador é um membro ou não
                    </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <br></br>

        </Col>
        </Row>
        <Col>
        <div className="d-grid">
        <Button id="BotaoSalvarDespesa" size="lg" type="submit" variant="success m-1"><FaRegSave></FaRegSave></Button>
        </div>
        </Col>
    </Form>
    </Card.Body>

    <Card.Footer>

    </Card.Footer>
    </Card>
    <br></br>
    </div>

    <Alert variant="success" show={sucessoMensagem!==""}><b><FaCheckCircle></FaCheckCircle> {sucessoMensagem}</b></Alert>
    </Container>
    </>);
}

export default DoacaoCadastro