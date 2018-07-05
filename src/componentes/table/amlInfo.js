import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Input, Label, FormGroup } from 'reactstrap';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'
import '../css/infoProduto.css'

export default class Table extends Component {
  constructor() {
    super()
    this.state = {origem:'',cnpj_fornecedor:'' ,nome_fornecedor:'',  historico:'', detalhesProduto:[], produto: '', solicitante: '', data: '', valor:'', nome:'', descricao:'' }
  }

  componentDidMount() {

    fetch('http://localhost:3001/estoque/historicoProduto/' + this.props.param, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
        this.setState({ historico: product });
      });

    fetch('http://localhost:3001/estoque/detalhesProduto/' + this.props.param, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(obj => {
        this.setState({ 
          descricao: obj[0].descricao,
          nome: obj[0].nome,
          valor: obj[0].valor,
          data: obj[0].data,
        });
      });

      fetch('http://localhost:3001/estoque/orcamento/' + this.props.param, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(obj => {
        this.setState({ 
          cnpj_fornecedor: obj.cnpj_fornecedor,
          nome_fornecedor: obj.nome_fornecedor,
          origem: obj.origem,
        });
      });


  }

render() {
  const options = {
    noDataText: 'Não há dados.',
  }

  return (
    <div id="table">
      <div className="row">
        <div className="col-sm">
          <h4 id='infoProd'>Informação do Produto</h4>
          <FormGroup id='Produto'>
            <Label> Data de Compra:</Label>
            <Input id='Data' disabled={true} type={'text'} name={'dataCompra'} value={this.state.data} />

            <Label> Valor: </Label>
            <Input id='Valor' disabled={true} type={'number'} name={'Valor'} value={(this.state.valor)?this.state.detalhesProduto.valor:0} />

            <Label> Solicitante:</Label>
            <Input disabled={true} type={'text'} name={'Solicitante'} value={this.state.nome} />

            <Label> Produto:</Label>
            <Input disabled={true} type={'textarea'} name={'produto'} value={this.state.descricao} />

          </FormGroup>
        </div>
        <div className="col-sm">
          <h4 id='infoProd'>Fornecedor</h4>
          <FormGroup id='Fornecedor'>
            <Label> CNPJ: </Label>
            <Input id='CNPJ' disabled type={'text'} name={'CNPJ'} value={this.state.cnpj_fornecedor} />

            <Label> Fornecedor:</Label>
            <Input id='FornecedorInfo' disabled type={'text'} name={'Fornecedor'} value={this.state.nome_fornecedor} />

            <Label> Referencia:</Label>
            <Input disabled type={'text'} name={'Referencia'} value={this.state.origem} />

            <Label> Arquivo:</Label>
            <Input disabled type={'text'} name={'Arquivo'} value={this.state.Arquivo} />

          </FormGroup>
        </div>
      </div>

      <h4 id='infoProd'>Historico Empréstimo</h4>
      <div id='Historico'>

        <BootstrapTable
          data={this.state.historico}
          selectRow={this.selectRowProp}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          options={options}
        >
          <TableHeaderColumn width='0%' dataField='id' isKey>                     ID                     </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='data' dataAlign='center'>     Data Movimentação         </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='tipo' dataAlign='center'>     Tipo                   </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade_lancamento' dataAlign='center'>     Quantidade             </TableHeaderColumn>
          <TableHeaderColumn width='40%' dataField='nome' dataAlign='center'>     Solicitante                </TableHeaderColumn>
        </BootstrapTable>
      </div>
    </div>
  );
}
}
