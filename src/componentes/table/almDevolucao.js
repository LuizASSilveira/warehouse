import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Redirect } from 'react-router-dom'
import '../css/table.css'
import { Button } from 'reactstrap'

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
        return <Button color="danger" onClick={() => this.toggle(row)} >Devolvido</Button>;
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
          <TableHeaderColumn             dataField='id' isKey>                          ID                        </TableHeaderColumn>
          <TableHeaderColumn width='14%' dataField='dataA'      dataAlign='center'>     Data Emprestimo           </TableHeaderColumn>
          <TableHeaderColumn width='14%' dataField='dataD'      dataAlign='center'>     Data Devolução            </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField='quantidade' dataAlign='center'>     Quantidade                </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='descricao'>                         Produto                   </TableHeaderColumn>
          <TableHeaderColumn width='19%' dataField='solicitante'>                       Solicitante               </TableHeaderColumn>
          <TableHeaderColumn width='11%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Devolução    </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
