import React, { useState, useEffect } from 'react';
import {Container, Card, Form, Table, Button, InputGroup} from 'react-bootstrap'
import moment from 'moment';


const Tarefas = () => {
    const [id, setId] = useState(0);
    const [titulo, setTiulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [dataEntrega, setDataEntrega] = useState('');
    const [status, setStatus] = useState('');
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        listarTarefas();
    }, [])

    const listarTarefas = () => {
        //Por padrão no fetch é o GET
        fetch('https://localhost:44330/api/tarefa', {
            method: 'Get',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
            .then(response => response.json())
            .then(data => {
                setTarefas(data.data);
                console.log(data.data);
                console.log(tarefas);
            })
    }
    const salvar =(event) => {
        console.log('EntrouSalva');
        event.preventDefault();

        //Crio o objeto tarefa
        const tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoria : categoria,
            dataentrega : dataEntrega,
            status : status
        }
     
        const method = (id === 0 ? 'POST' : 'PUT');
        const urlRequest = (id === 0 ? 'https://localhost:44330/api/tarefa' : 'https://localhost:44330/api/tarefa/' + id);
        
        console.log(tarefa);
        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(tarefa),
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir'),
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Tarefa salva');

            listarTarefas();

            limparCampos();
        })
    }
    const editar =(event) => {
        event.preventDefault();

        fetch('http://localhost:5000/api/tarefa/' + event.target.value,{
            method : 'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
        .then(response => response.json())
        .then(data => {
            setId(data.id);
            setTitulo(data.titulo);
            setDescricao(data.descricao);
            setCategoria(data.categoria);
            setDataEntrega(data.dataentrega.substring(0,10));
            setStatus(data.status);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const excluir = (event) => {

        if(window.confirm("Deseja realmente excuir a tarefa?")){
            fetch('http://localhost:5000/api/tarefa/' + event.target.value,{
                method : 'Delete',
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                }
            })
            .then(() => {
                alert('Tarefa excluída!!!');

                listarTarefas();
            })
        }
    }

    const alterarStatus = (event) => {
        if(window.confirm("Deseja realmente alterar o status da tarefa?")){
            fetch('http://localhost:5000/api/tarefa/status/' + event.target.value,{
                method : 'Put',
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                }
            })
            .then(() => {
                alert('Tarefa alterada!!!');

                listarTarefas();
            })
        }
    }

    const limparCampos = () => {
        setId(0);
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setDataEntrega('');
        setStatus(false);
    }
    return (
        <Container>
            <Card>
               <Card.Body>
                        <Form onSubmit={ event => salvar(event)}>
                            <Form.Group controlId="formBasicTitulo">
                                <Form.Label>Título</Form.Label>
                                <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Informe o título" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDescricao">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)}  placeholder="Informe a descrição" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicCategoria">
                                <Form.Label>Categoria</Form.Label>
                                <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.value)}  placeholder="Informe a categoria" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicDataEntrega">
                                <Form.Label>Data Entrega</Form.Label>
                                <Form.Control type="date" value={dataEntrega} onChange={event => setDataEntrega(event.target.value)} placeholder="Informe a data de entrega" required />
                            </Form.Group>

                            
                            <Button type="submit">Salvar</Button>
                        </Form>
                </Card.Body>
            </Card>
            
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        <th>Data Entrega</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tarefas.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.titulo}</td>
                                    <td>{item.descricao}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.dataEntrega}</td>
                                    <td>{item.status ? 'Feito' : 'Para Fazer'}</td>
                                    <td>
                                        <button variant="warning" value={item.id}>Editar</button>
                                        <button variant="danger" value={item.id}>Excluir</button>
                                        <button variant="primary" value={item.id}>Alterar Status</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default Tarefas;

