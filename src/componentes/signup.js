import React, { Component } from "react";
import "./css/login.css";
import { Redirect } from "react-router-dom";
import {
  InputGroup,
  Form,
  Input,
  FormGroup,
  Label,
  Col,
  Button,
  Container,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardHeader
} from "reactstrap";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: [], redirect: false };
  }
  envia(event) {
    event.preventDefault();
    const requestInfo = {
      method: "POST",
      body: JSON.stringify({
        email: this.email.value,
        departamento: this.departamento.value,
        nome: this.nome.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };

    fetch("http://localhost:3001/signup", requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("não foi possível fazer o cadastro");
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
                    <FormGroup row>
                      <Col sm={12}>
                        <Input
                          innerRef={input => (this.email = input)}
                          type="email"
                          name="email"
                          placeholder="Email"
                        />
                        {""}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col sm={12}>
                        <Input
                          innerRef={input => (this.departamento = input)}
                          type="text"
                          name="departamento"
                          placeholder="Departamento"
                        />
                        {""}
                      </Col>
                    </FormGroup>
                    <Button type="submit" color="success">
                      Entrar
                    </Button>
                    <a class="btn btn-primary" href="/">
                      Login
                    </a>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}
