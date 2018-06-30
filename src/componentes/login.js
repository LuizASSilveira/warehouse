import React, { Component } from "react";
import "./css/login.css";
import { Redirect } from "react-router-dom";
import {
  
  Form,
  Input,
  FormGroup,
  Col,
  Button,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader
} from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: [] };
  }
  envia(event) {
    event.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({ nome: this.nome.value, senha: this.senha.value }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:3001/login", requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("não foi possível fazer o login");
        }
      })
      .then(token => {
        var obj = JSON.parse(token);
        localStorage.setItem("auth-token", obj.token);
        localStorage.setItem("isAdm", obj.isAdm);
        localStorage.setItem("nome", obj.nome);
        this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ msg: error.message });
      });
  }

  componentDidMount() {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("isAdm");
    localStorage.removeItem("nome");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/solicitacao/historico" />;
    }
    return (
      <div>
        <Container>
          <br />
          <br />
          <Card body className="text-center">
            <CardHeader>Almoxarifado UTFPR </CardHeader>
            <CardBody>
              <CardTitle />
              <CardText>
                <span>{this.state.msg}</span>
              </CardText>

              <Row>
                <Col sm="12" md={{ size: 8, offset: 2 }}>
                  <Form onSubmit={this.envia.bind(this)}>
                    <FormGroup row>
                      <Col sm={12}>
                        <Input
                          innerRef={input => (this.nome = input)}
                          type="text"
                          name="username"
                          placeholder="Nome de Usuário"
                        />
                        {""}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Input
                          innerRef={input => (this.senha = input)}
                          type="password"
                          name="senha"
                          placeholder="Senha"
                        />
                        {""}
                      </Col>
                    </FormGroup>
                    <Button type="submit" color="success">
                      Entrar
                    </Button>
                    <a class="btn btn-primary" href="/cadastrar">
                      Cadastrar
                    </a>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>

      // {/* <h1 className="header-logo">Almoxarifado UTFPR</h1> */}
      // <span>{this.state.msg}</span>

      // <Form onSubmit={this.envia.bind(this)}>
      //   <FormGroup>
      //     <Label for="exampleEmail">Email</Label>
      //     <Input
      //       type="email"
      //       name="email"
      //       id="exampleEmail"
      //       placeholder="with a placeholder"
      //     />
      //   </FormGroup>
      // </Form>
      // <input
      //   placeholder=" Usuário"
      //   type="text"
      //   ref={input => (this.nome = input)}
      // />
      // <input
      //   placeholder=" Senha"
      //   type="password"
      //   ref={input => (this.senha = input)}
      // />
      // <div>
      //   <input type="submit" value="Entrar" />
      //   <a class="btn btn-primary" href="/cadastrar" value="Cadastrar" />
      // </div>
    );
  }
}
