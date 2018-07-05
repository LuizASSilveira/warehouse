import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'
export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false }
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
  }
  componentDidMount() {
  
      fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
          'token': localStorage.getItem('auth-token')
        })
      })
        .then(response => response.json())
        .then(product => {
          this.setState({ products: product });
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
  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      return <Button color="primary" onClick={() => this.toggle(row)} >Aprovar</Button>;
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
          <TableHeaderColumn width='0%' dataField='id' isKey>                                          ID              </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='nome'        dataAlign='center'>                   Usuario         </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='departamento'   dataAlign='center'>                Departamento    </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='email'          dataAlign='center'>                Email           </TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField="button"         dataFormat={buttonFormatter.bind(this)}>    Devolução       </TableHeaderColumn>
        </BootstrapTable>
        <Modal cabecalho='Validar Usuario' mensagem='Gostaria de Aprovar esse Usuario' divID="invisivel" divNum="invisivel" modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
      </div>
    );
  }
}
