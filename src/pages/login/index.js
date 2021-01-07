import React, { useState } from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import logo from '../../../src/logo.svg';
import './index.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const logar = (event) => {
        event.preventDefault();
     

        const objLogin ={
            "email" : email,
            "senha" : senha
        }
        console.log(objLogin);

        fetch("https://localhost:44330/api/usuario/login",{
            method : 'POST',
            body : JSON.stringify(objLogin),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(Response => {
            if(Response.ok){
                return Response.json();
            }
            alert("Dados inválidos");
        })
        .then(data => {
            console.log(data);

            localStorage.setItem('token-gerir',data.token);
        })
    }

    return (
        <Container className='form-height'>
        <Form className='form-signin' onSubmit={event => logar(event)}>
            <div className='text-center'>
             <img src={logo} alt='NYOUS' style={{ width : '64px'}} />
            </div>
            <br/>
            <small>Informe os dados Abaixo</small>
            <hr/>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Informe o email" required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" value={senha} onChange={event => setSenha(event.target.value)} placeholder="Senha"  required/>
            </Form.Group>
            <Button variant="primary" type="submit" >
                Enviar
            </Button>
            <br/><br/>
            <a href='/cadastrar' style={{ marginTop :'30px'}}>Não tenho conta!</a>
        </Form>
    </Container>
    );


}

export default Login;