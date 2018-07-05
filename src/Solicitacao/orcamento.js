import React, { Component, Nav } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
  CustomInput,
  Container,
  Col,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from "reactstrap";

const baseURL = `http://localhost:3001/orcamentos`;

const initialState = {
  orcamento: {
    cnpj_fornecedor: "",
    nome_fornecedor: "",
    valor: "",
    referencia: "",
    pdf_patch: ""
  },
  listaOrcamentos: [],
  mediaUnit: 0.0,
  precoMin: 0.0,
  precoMax: 0.0,
  valid: false
};

export default class Orcamento extends Component {
  state = { ...initialState };

  getPrices(lista) {
    if (lista > 0) {
      if (
        lista[lista.lenght - 1].valor >= this.state.precoMin &&
        lista[lista.lenght - 1].valor > this.state.precoMax
      ) {
        this.setState({
          mediaUnit: initialState.mediaUnit,
          precoMin: initialState.precoMin,
          precoMax: initialState.precoMax
        });

        if (lista.length > 0) {
          let sum = 0;
          lista.forEach(item => {
            sum += item.valor;
          });

          let mediaUnit = (sum / lista.length).toFixed(2);
          let precoMin = (mediaUnit * 0.6).toFixed(2);
          let precoMax = (mediaUnit * 1.6).toFixed(2);

          this.setState({
            mediaUnit,
            precoMin,
            precoMax
          });
        }
      } else {
        lista.pop();
        this.state.listaOrcamentos = lista;
      }
    } else {
      this.setState({
        mediaUnit: initialState.mediaUnit,
        precoMin: initialState.precoMin,
        precoMax: initialState.precoMax
      });

      if (lista.length > 0) {
        let sum = 0;
        lista.forEach(item => {
          sum += item.valor;
        });

        let mediaUnit = (sum / lista.length).toFixed(2);
        let precoMin = (mediaUnit * 0.6).toFixed(2);
        let precoMax = (mediaUnit * 1.6).toFixed(2);

        this.setState({
          mediaUnit,
          precoMin,
          precoMax
        });
      }
    }
  }

  componentDidMount() {
    var parser = document.createElement("a");
    parser.href = window.location.href;
    // console.log(parser.pathname.slice(21));
    fetch(`${baseURL}/${parser.pathname.slice(21)}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        token: localStorage.getItem("auth-token")
      })
    })
      .then(response => response.json())
      .then(product => {
        this.setState({ listaOrcamentos: product });
        this.getPrices(this.state.listaOrcamentos);
      });
  }

  clear() {
    this.setState({ orcamento: initialState.orcamento });
  }

  save() {
    const orcamento = this.state.orcamento;

    var parser = document.createElement("a");
    parser.href = window.location.href;
    axios
      .post(`${baseURL}/${parser.pathname.slice(21)}`, orcamento, {
        headers: new Headers({
          "Content-Type": "application/json",
          token: localStorage.getItem("auth-token")
        })
      })
      .then(resp => {
        const lista = this.getUpdatedList(resp.data);
        this.setState({
          orcamento: initialState.orcamento,
          listaOrcamentos: lista
        });
      });
    this.getPrices(this.state.listaOrcamentos);
    window.location.reload();
  }

  // save() {
  //   const requestInfo = {
  //     method: "POST",
  //     body: {
  //       cnpj_fornecedor: this.state.orcamento.cnpj_fornecedor,
  //       nome_fornecedor: this.state.orcamento.nome_fornecedor,
  //       valor: this.state.orcamento.valor,
  //       solicitacao_id: this.props.dado,
  //       origem: this.state.orcamento.referencia
  //     }
  //     // headers: new Headers({
  //     //   "Content-Type": "application/json",
  //     //   token: localStorage.getItem("auth-token")
  //     // })
  //   };

  //   fetch(baseURL, requestInfo).then(response => {
  //     if (response.ok) {
  //       //alerta dados salvos com sucesso
  //       window.location.reload();
  //       this.getUpdatedList(response);
  //       // this.props.history.push("/solicitacao/historico");
  //     } else {
  //       console.log(response);
  //     }
  //   });
  // }

  getUpdatedList(orcamento) {
    if (orcamento) {
      const lista = this.state.listaOrcamentos.filter(
        orc => orc.id !== orcamento.id
      );
      lista.unshift(orcamento);
      return lista;
    } else {
      return this.state.listaSolicitacao;
    }
  }

  updateField(event) {
    const orcamento = { ...this.state.orcamento };
    orcamento[event.target.name] = event.target.value;
    this.setState({ orcamento });

    if (this.state.listaOrcamentos.length > 0) {
      if (orcamento.valor < this.state.precoMin) {
        this.state.valid = false;
      } else if (orcamento.valor > this.state.precoMax) {
        this.state.valid = false;
      } else {
        this.state.valid = true;
      }
    }
  }

  load(orcamento) {
    this.setState({ orcamento });
  }
  remove(orcamento) {
    axios.delete(`${baseURL}/${orcamento.id}`).then(() => {
      const lista = this.getUpdatedList(null);
      this.setState({ listaOrcamentos: lista });
    });
    this.getPrices(this.state.listaOrcamentos);
    window.location.reload();
  }

  renderForm() {
    return (
      <Container>
        <h3>Orçamentos</h3>
        <br />

        <AvForm>
          <Row>
            <Col sm={4}>
              <AvField
                label="CNPJ Fornecedor"
                type="number"
                name="cnpj_fornecedor"
                value={this.state.orcamento.cnpj_fornecedor}
                onChange={event => this.updateField(event)}
                placeholder="CNPJ do Fornecedor"
                required
                errorMessage="Campo inválido"
              />
            </Col>

            <Col sm={5}>
              <AvField
                label="Nome Fornecedor"
                required
                type="text"
                name="nome_fornecedor"
                value={this.state.orcamento.nome_fornecedor}
                onChange={event => this.updateField(event)}
                placeholder="Nome do Fornecedor"
                errorMessage="Campo inválido"
              />
            </Col>

            <Col sm={3}>
              <AvField
                label="Valor (R$)"
                required
                type="number"
                name="valor"
                value={this.state.orcamento.valor}
                onChange={event => this.updateField(event)}
                placeholder="Valor 0,00"
                errorMessage="Campo inválido"
                valid={this.state.valid}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <AvField
                label="Referência"
                type="text"
                name="referencia"
                value={this.state.orcamento.referencia}
                onChange={event => this.updateField(event)}
                placeholder="http://www..."
                errorMessage="Campo inválido"
              />
            </Col>
            <Col>
              <Label>Arquivo</Label>
              <CustomInput
                type="file"
                id="pdf_path"
                name="pdf_path"
                value={this.state.orcamento.pdf_path}
                label="Submeta um arquivo de orçamento."
              />
            </Col>
          </Row>
          <Button color="primary" onClick={event => this.save(event)}>
            Salvar
          </Button>{" "}
          <Button color="secondary" onClick={event => this.clear(event)}>
            Cancelar
          </Button>{" "}
        </AvForm>
      </Container>
    );
  }

  renderTable() {
    const options = {
      insertModalHeader: this.createCustomModalHeader,
      noDataText: "Sem dados."
    };
    return (
      <div>
        <Container>
          <hr />

          <BootstrapTable
            data={this.state.listaOrcamentos}
            search
            multiColumnSearch
            searchPlaceholder="Pesquisar"
            options={options}
            className="mt-4"
          >
            <TableHeaderColumn isKey dataField="cnpj_fornecedor">
              {" "}
              CNPJ{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nome_fornecedor">
              {" "}
              Fornecedor{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="valor"> Valor R$ </TableHeaderColumn>
            <TableHeaderColumn dataField="origem">
              {" "}
              Referência{" "}
            </TableHeaderColumn>
            <TableHeaderColumn dataField="pdf_path">
              {" "}
              Arquivo{" "}
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={(cell, row) => {
                let orcamento = row;
                return (
                  <div>
                    <Button
                      className="btn btn-default"
                      onClick={() => this.load(orcamento)}
                    >
                      <i className="fa fa-edit" />
                    </Button>
                    <Button
                      className="btn btn-danger"
                      onClick={() => this.remove(orcamento)}
                    >
                      <i className="fa fa-remove" />
                    </Button>
                  </div>
                );
              }}
            >
              Opções
            </TableHeaderColumn>
          </BootstrapTable>
          <hr />
        </Container>
      </div>
    );
  }

  renderPrices() {
    return (
      <Container>
        <Form>
          <FormGroup row>
            <Col sm={4}>
              <Label>Preço Médio</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                <Input
                  type="number"
                  disabled
                  value={this.state.mediaUnit ? this.state.mediaUnit : 0.0}
                  onChange={event => this.updateField(event)}
                />
              </InputGroup>
            </Col>

            <Col sm={4}>
              <Label>Preço Mínimo Aceitável</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                <Input
                  type="number"
                  disabled
                  value={this.state.precoMin ? this.state.precoMin : 0.0}
                  onChange={event => this.updateField(event)}
                />
              </InputGroup>
            </Col>
            <Col sm={4}>
              <Label>Preço Máximo Aceitável</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                <Input
                  type="number"
                  disabled
                  value={this.state.precoMax ? this.state.precoMax : 0.0}
                  onChange={event => this.updateField(event)}
                />
              </InputGroup>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }

  render() {
    return (
      <div>
        {this.renderForm()}

        {this.renderTable()}

        {this.renderPrices()}
      </div>
    );
  }
}
