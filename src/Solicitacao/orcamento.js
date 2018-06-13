import React, { Component } from "react";
import Nav from "../componentes/navbarAdm";
import OrcamentoTable from "../componentes/table/orcamentos";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
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
  Label
} from "reactstrap";

const baseURL = "http://localhost:3001/orcamentos";
const initialState = {
  orcamento: {
    cnpj_fornecedor: "",
    nome_fornecedor: "",
    valor: "",
    referencia: "",
    pdf_patch: ""
  },
  listaSolicitacao: []
};

export default class Orcamento extends Component {
  constructor(props){
    super(props)
  }
  state = { ...initialState };

  componentWillMount() {
    axios(baseURL).then(resp => {
      this.setState({ listaOrcamentos: resp.data });
    });
  }

  clear() {
    this.setState({ orcamento: initialState.orcamento });
  }

  save() {
    const orcamento = this.state.orcamento;
    const method = orcamento.id ? "put" : "post";
    const url = orcamento.id ? `${baseURL}/${orcamento.id}` : baseURL;
    axios[method](url, orcamento).then(resp => {
      const lista = this.getUpdatedList(resp.data);
      this.setState({
        orcamento: initialState.orcamento,
        listaOrcamentos: lista
      });
    });
  }

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
  }

  load(orcamento) {
    this.setState({ orcamento });
  }
  remove(orcamento) {
    axios.delete(`${baseURL}/${orcamento.id}`).then(resp => {
      const lista = this.getUpdatedList(null);
      this.setState({ listaOrcamentos: lista });
    });
  }

  renderForm() {
    return (
      <Container>
        <h3>Orçamentos</h3>
        <Form>
          <FormGroup row>
            <Col sm={4}>
              <Input
                required
                type="number"
                name="cnpj_fornecedor"
                value={this.state.orcamento.cnpj_fornecedor}
                onChange={event => this.updateField(event)}
                placeholder="CNPJ do Fornecedor"
              />
            </Col>

            <Col sm={5}>
              <Input
                required
                type="text"
                name="nome_fornecedor"
                value={this.state.orcamento.nome_fornecedor}
                onChange={event => this.updateField(event)}
                placeholder="Nome do Fornecedor"
              />
            </Col>
            <Col sm={3}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                <Input
                  required
                  type="number"
                  name="valor"
                  value={this.state.orcamento.valor}
                  onChange={event => this.updateField(event)}
                  placeholder="Valor 0,00"
                />
              </InputGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <InputGroup>
                <InputGroupAddon addonType="prepend">URL</InputGroupAddon>
                <Input
                  type="text"
                  name="referencia"
                  value={this.state.orcamento.referencia}
                  onChange={event => this.updateField(event)}
                  placeholder="http://www..."
                />
              </InputGroup>
            </Col>
            <Col>
              <CustomInput
                type="file"
                id="pdf_path"
                name="pdf_path"
                label="Submeta um arquivo de orçamento."
              />
            </Col>
          </FormGroup>
          <div>
            <Button color="primary" onClick={event => this.save(event)}>
              Salvar
            </Button>{" "}
            <Button color="secondary" onClick={event => this.clear(event)}>
              Cancelar
            </Button>{" "}
          </div>
        </Form>
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
              CNPJ
            </TableHeaderColumn>
            <TableHeaderColumn dataField="nome_fornecedor">
              Fornecedor
            </TableHeaderColumn>
            <TableHeaderColumn dataField="valor">Valor R$</TableHeaderColumn>
            <TableHeaderColumn dataField="referencia">
              Referência
            </TableHeaderColumn>
            <TableHeaderColumn dataField="pdf_path">Arquivo</TableHeaderColumn>
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

  setMediaUnit() {
    let media = 0;
    if (this.state.listaOrcamentos > 0) {
      this.state.listaOrcamentos.map(orcamento => {
        media += orcamento.valor;
      });
      return (media / this.state.listaOrcamentos.length) * 1.0;
    } else {
      return media;
    }
  }

  renderPrices() {
    return (
      <Container>
        <Form>
          <FormGroup row>
            <Col sm={4}>
              <Label>Preço Média</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">R$</InputGroupAddon>
                <Input
                  type="number"
                  disabled
                  value={this.setMediaUnit()}
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
                  value={this.state.orcamento.valor}
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
                  value={this.state.orcamento.valor}
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
        <Nav isadm={true} />

        {this.renderForm()}

        {this.renderTable()}

        {this.renderPrices()}
      </div>
    );
  }
}
