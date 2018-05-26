import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props);        
        this.state = {msg:[]};
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
                localStorage.setItem('auth-token',token);
                console.log(token)
                
            })
            .catch(error => {
                this.setState({msg:error.message});
            });
    }
    
    render(){
        return (
            <div className="login-box">
            <h1 className="header-logo">WareHouse</h1>
            <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text"      ref={(input) => this.nome = input}/>
                    <input type="password"  ref={(input) => this.senha = input}/>
                    <input type="submit"    value="login"/>
                </form>
            </div>
        );
    }
}