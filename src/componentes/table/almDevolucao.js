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
    fetch('http://localhost:3001/estoque/devolucao')
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
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
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
          <TableHeaderColumn width='0%'  dataField='IdProduto' isKey>                                ID               </TableHeaderColumn>
          <TableHeaderColumn width='0%'  dataField='usuario_id'>                                     Usuario Id       </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='dataD'  dataAlign='center'>                      Data Devolução   </TableHeaderColumn>
          <TableHeaderColumn width='40%' dataField='descricao'>                                      Produto         </TableHeaderColumn>
          <TableHeaderColumn width='25%' dataField='Saidas' dataAlign='center'>                      Quantidade       </TableHeaderColumn>
          <TableHeaderColumn width='25%' dataField='nome'>                                           Solicitante      </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Devolução        </TableHeaderColumn>
        </BootstrapTable>
        <Modal divID="invisivel" divNum="invisivel" mensagem="Gostaria de confimar a devolução"  modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
      </div>
    );
  }
}
