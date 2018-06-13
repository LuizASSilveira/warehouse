import React, { Component } from 'react';
import './css/login.css';
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor(props){
        super(props);        
        this.state = {msg:[], redirect: false};
    }
    envia(event){
        event.preventDefault();
        const requestInfo = {
            method:'POST',  
            body:JSON.stringify({nome:this.nome.value,senha:this.senha.value}),
            headers:new Headers({
                'Content-type' : 'application/json' 
            })
        };

        fetch('http://localhost:3001/login',requestInfo)
           .then(response => {
                if(response.ok) {
                    return response.text();
                } else {
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token => {
                var obj = JSON.parse(token);
                localStorage.setItem('auth-token',obj.token);
                localStorage.setItem('isAdm',obj.isAdm);
                localStorage.setItem('nome',obj.nome);
                this.setState({ redirect: true })

            })
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    componentDidMount(){
        localStorage.removeItem('auth-token')
        localStorage.removeItem('isAdm')
        localStorage.removeItem('nome')
    }
    
    render(){
        if (this.state.redirect) {
            return <Redirect to='/solicitacao/historico'/>;
        }
        return(
            <div className="login-box">
            <h1 className="header-logo">Almoxarifado UTFPR</h1>
            <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input placeholder=" Usuário" type="text" ref={(input) => this.nome = input}/>
                    <input placeholder=" Senha" type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="Entrar" />
                </form>
            </div>
        );
    }
}