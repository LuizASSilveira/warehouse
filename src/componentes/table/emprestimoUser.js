import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import Modal from '../confirmModal'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false }
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/emprestimo.json')
      .then(response => response.json())
      .then(product => {
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
    console.log(row)
    this.setState({
      modal: !this.state.modal
    })

  }



  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      console.log(row.id)
      return <Button color="danger" onClick={() => this.toggle(row)} >Emprestar</Button>;
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
          <TableHeaderColumn dataField='id' isKey>  ID                                                            </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade' dataAlign='center'>  Quantidade Disponivel        </TableHeaderColumn>
          <TableHeaderColumn width='70%' dataField='descricao'>   Produto                                       </TableHeaderColumn>
          <TableHeaderColumn width='0%' dataField='data'>         Data                                       </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Emprestimo    </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}