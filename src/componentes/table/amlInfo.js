import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import {Input,Label ,FormGroup } from 'reactstrap';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { historico: [], produto: '', solicitante:'' }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/emprestimo.json')
      .then(response => response.json())
      .then(product => {
        this.setState({ 
            historico:  product,
            produto:    product[0].descricao  
        })
      });
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
    } 
    return (
      <div id="table">
        <FormGroup>
            
            <Label> Data Compra</Label>
            <Input  disabled type={'text'}      name={'dataCompra'}   value={this.state.data} />

            <Label> Produto</Label>
            <Input  disabled type={'textarea'}  name={'produto'}      value={this.state.produto} />
            
            <Label> Solicitante</Label>
            <Input  disabled type={'text'}      name={'Solicitante'}  value={this.state.solicitante} />

            <Label> Fornecedor</Label>
            <Input  disabled type={'text'}      name={'produto'}       value={this.state.Fornecedor} />

        </FormGroup>

        <Label> Historico Produto</Label>    
        <BootstrapTable
          data={this.state.historico}
          selectRow={this.selectRowProp}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          options={options}
        >
          <TableHeaderColumn width='0%'  dataField='id'             isKey>                  ID                        </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField='quantidade'     dataAlign='center'>     Quantidade                </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='dataA'          dataAlign='center'>     Data Emprestimo           </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='dataD'          dataAlign='center'>     Data Devolução            </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='local'          dataAlign='center'>     Localidade                </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='solicitante'>                           Solicitante               </TableHeaderColumn>
        </BootstrapTable>   
      </div>
    );
  }
}
