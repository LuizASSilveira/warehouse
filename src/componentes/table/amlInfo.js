import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Input, Label, FormGroup } from 'reactstrap';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'
import '../css/infoProduto.css'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { historico: [], produto: '', solicitante: '' }
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/emprestimo.json')
      .then(response => response.json())
      .then(product => {
        this.setState({
          historico: product,
          produto: product[0].descricao
        })
      });
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    return (
      <div id="table">
        <div class="row">
          <div class="col-sm">
            <h4 id='infoProd'>Informação do Produto</h4>
            <FormGroup id='Produto'>
              <Label> Data de Compra:</Label>
              <Input id='Data' disabled type={'text'} name={'dataCompra'} value={this.state.data} />

              <Label> Valor: </Label>
              <Input id='Valor' disabled type={'text'} name={'Valor'} value={this.state.Valor} />

              <Label> Solicitante:</Label>
              <Input disabled type={'text'} name={'Solicitante'} value={this.state.solicitante} />

              <Label> Produto:</Label>
              <Input disabled type={'textarea'} name={'produto'} value={this.state.produto} />

            </FormGroup>
          </div>
          <div class="col-sm">
            <h4 id='infoProd'>Fornecedor</h4>
            <FormGroup id='Fornecedor'>
              <Label> CNPJ: </Label>
              <Input id='CNPJ' disabled type={'text'} name={'CNPJ'} value={this.state.CNPJ} />

              <Label> Fornecedor:</Label>
              <Input id='FornecedorInfo' disabled type={'text'} name={'Fornecedor'} value={this.state.Fornecedor} />

              <Label> Referencia:</Label>
              <Input disabled type={'text'} name={'Referencia'} value={this.state.Referencia} />

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
            <TableHeaderColumn width='0%' dataField='id' isKey>                  ID                        </TableHeaderColumn>
            <TableHeaderColumn width='12%' dataField='quantidade' dataAlign='center'>     Quantidade                </TableHeaderColumn>
            <TableHeaderColumn width='15%' dataField='dataA' dataAlign='center'>     Data Emprestimo           </TableHeaderColumn>
            <TableHeaderColumn width='15%' dataField='dataD' dataAlign='center'>     Data Devolução            </TableHeaderColumn>
            <TableHeaderColumn width='20%' dataField='local' dataAlign='center'>     Localidade                </TableHeaderColumn>
            <TableHeaderColumn width='20%' dataField='solicitante'>                           Solicitante               </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
