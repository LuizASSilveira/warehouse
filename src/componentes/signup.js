import React, { Component } from "react";
import "./css/login.css";
import { Input, FormGroup, Label, Button } from "reactstrap";
export default class Signup extends Component {
  constructor() {
    super();
    this.state = { msg: [], nome: '', email: '', senha: '', departamento: '' };
  }
  envia() {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ nome: this.state.nome, senha: this.state.senha, email: this.state.email , departamento: this.state.departamento }),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch('http://localhost:3001/signup', requestInfo)
      .then(response => {
        if (response.ok) {
          this.props.history.push('/')
        } else {
          throw new Error("não foi possivel salvar as alterações");
        }
      })
  }
  ChangeDes(event) {
    this.setState({ nome: event.target.value});
  }
  ChangeSen(event) {
    this.setState({ senha: event.target.value});
  }
  ChangeEma(event) {
    this.setState({ email: event.target.value});
  }
  ChangeDep(event) {
    this.setState({ departamento: event.target.value});
  }
  voltar(){
    this.props.history.push('/')
  }

  render() {
    return (
      <div id='cadastro'>
        <h1 id= 'logo' className="header-logo">Cadastro</h1>

        <FormGroup>         
          <Label>Nome de Usuario</Label>
          <Input id="Label" placeholder=" Usuário"       type="text"     onChange={this.ChangeDes.bind(this)} value={this.state.nome}      />

          <Label>Senha</Label>
          <Input id="Label" placeholder=" Senha"         type="password" onChange={this.ChangeSen.bind(this)} value={this.state.senha}  />
          
          <Label>Email</Label>
          <Input id="Label" placeholder=" Email"         type="email"    onChange={this.ChangeEma.bind(this)} value={this.state.email}  />

          <Label>Departamento</Label>
          <Input id="Label" placeholder=" Departamento"  type="text"     onChange={this.ChangeDep.bind(this)} value={this.state.departamento}  />
          <div id='buttonCadastro'>
          <Button  id='button'  onClick={this.envia.bind(this)}   color="primary">    Cadastrar </Button>
          <Button  id="button"  onClick={this.voltar.bind(this)}  color="secondary">  voltar    </Button>
          </div>
          </FormGroup>
      </div>
    );
  }
}
