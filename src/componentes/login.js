import React, { Component } from 'react';
import InputG from '../componentes/inputGenerico';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: [] };
    }
    envia(event) {
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ nome: this.nome.value, senha: this.senha.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch('http://localhost:3001/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token => {
                var obj = JSON.parse(token);
                localStorage.setItem('auth-token', obj.token);
            })
            .catch(error => {
                this.setState({ msg: error.message });
            });
    }

    
    
    render(){
        return(
            <div class="login">
                <div class="login-screen">
                    <div class="app-title">
                        <h1>Login</h1>
                    </div>
                    <div class="login-form">
                        <span>{this.state.msg}</span>
                        <form onSubmit={this.envia.bind(this)}>
                            <InputG placeholder={'Usuário'} type={'text'} ref={'{(input) => this.nome = input}'}/>
                            <InputG placeholder={'Senha'} type={'password'} ref={'{(input) => this.senha = input}'}/>
                            <InputG type={'submit'} value={'Entrar'}/>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}