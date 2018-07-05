import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Button, Input } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false , codigoB: ""}
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
  }
  
  componentDidMount() {
    fetch('http://localhost:3001/estoque/historicoUsuario')
      .then(response => response.json())
      .then(product => {
        console.log(product)
        this.setState({ products: product })
      });
  }
  funcConfirm() {
    this.funcCancel()
  }
  funcCancel() {
    this.setState({ modal: false })
  }
  toggle(row) {
    this.setState({
      modal: !this.state.modal
    })
  }
  toggleInput(valor) {
    this.setState({
      codigoB : valor
    })
  }
  setCodigo(valor){
    console.log(valor)    
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      return <Button color="danger" value={this.state.codigoB} onClick={() => this.toggle(row)} >Devolvido</Button>
    }
    
    function inputFormatter(cell, row) {
      return <Input onClick={() => this.oggleInpu(row)}/>
    }


    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          selectRow={this.selectRowProp}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          options={options}
        >
          <TableHeaderColumn width='12%' dataField='id' isKey>                                                   ID               </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField='quantidade' dataAlign='center'>                  Quantidade       </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='descricao'>                                      Produto          </TableHeaderColumn>
          <TableHeaderColumn width='19%' dataField='solicitante'>                                    Solicitante      </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField="button" dataFormat={inputFormatter.bind(this)}>  Código        </TableHeaderColumn>
          <TableHeaderColumn width='11%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Devolução        </TableHeaderColumn>
        </BootstrapTable>
        <Modal func='' cabecalho="Almoxarifado" label="Código de Barras" modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
      </div>
    );
  }
}
