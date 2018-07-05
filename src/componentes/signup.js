import React, { Component } from "react";
import "./css/login.css";
import { Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
export default class Signup extends Component {
  constructor() {
    super();
    this.state = { msg: [], nome: "", email: "", senha: "", departamento: "" };
  }
  envia() {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        nome: this.state.nome,
        senha: this.state.senha,
        email: this.state.email,
        departamento: this.state.departamento
      }),
      headers: new Headers({
        "Content-type": "application/json",
        token: localStorage.getItem("auth-token")
      })
    };
    fetch("http://localhost:3001/signup", requestInfo).then(response => {
      if (response.ok) {
        this.props.history.push("/");
      } else {
        throw new Error("não foi possivel salvar as alterações");
      }
    });
  }
  ChangeDes(event) {
    this.setState({ nome: event.target.value });
  }
  ChangeSen(event) {
    this.setState({ senha: event.target.value });
  }
  ChangeEma(event) {
    this.setState({ email: event.target.value });
  }
  ChangeDep(event) {
    this.setState({ departamento: event.target.value });
  }
  voltar() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div id="cadastro">
        <h1 id="logo" className="header-logo">
          Cadastro
        </h1>

        <AvForm>
          <AvField
            placeholder=" Usuário"
            type="text"
            name="usuario"
            label="Usuário"
            required
            onChange={this.ChangeDes.bind(this)}
            value={this.state.nome}
            errorMessage="Campo inválido"
          />
          <AvField
            id="Label"
            placeholder=" Senha"
            name="senha"
            type="password"
            label="Senha"
            onChange={this.ChangeSen.bind(this)}
            value={this.state.senha}
            required
            errorMessage="Campo inválido"
          />

          <AvField
            id="Label"
            placeholder=" Email"
            onChange={this.ChangeEma.bind(this)}
            value={this.state.email}
            name="email"
            label="Email"
            type="email"
            required
            errorMessage="Campo inválido"
          />

          <AvField
            label="Departamento"
            id="Label"
            name="departamento"
            placeholder=" Departamento"
            type="text"
            onChange={this.ChangeDep.bind(this)}
            value={this.state.departamento}
            required
            errorMessage="Campo inválido"
          />
          <Button id="button" onClick={this.envia.bind(this)} color="primary">
            {" "}
            Cadastrar{" "}
          </Button>
          <Button
            id="button"
            onClick={this.voltar.bind(this)}
            color="secondary"
          >
            {" "}
            voltar{" "}
          </Button>
        </AvForm>
      </div>
    );
  }
}
