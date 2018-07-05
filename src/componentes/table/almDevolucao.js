import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'
export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false, estoque_id:'', usuario_id: 0, quantidade: 0, }
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
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        estoque_id: this.state.estoque_id,
        quantidade: this.state.quantidade,
        usuario_id: this.state.usuario_id,
      }),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch('http://localhost:3001/estoque/devolucao', requestInfo)
      .then(response => {
        if (response.ok) {
          window.location.reload()
        } else {
          throw new Error("não foi possivel salvar as alterações");
        }
      })
    this.funcCancel()  
  }
  funcCancel() {
    this.setState({ modal: false })
  }
  toggle(row) {
    this.setState({
      estoque_id: row.IdProduto,
      quantidade: row.Saidas,
      usuario_id: row.usuario_id,
      modal: !this.state.modal
    })
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      return (
        <div>
          <Button color="primary" onClick={() => this.toggle(row)} >Devolução</Button><br/>
          {/* <Button color="success" onClick={() => this.toggle(row)} >Retirada</Button> */}
        </div>
      )
    }
    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          options={options}
        >
          <TableHeaderColumn width='0%'  dataField='IdProduto' isKey>                                ID               </TableHeaderColumn>
          {/* <TableHeaderColumn width='20%' dataField='dataD'  dataAlign='center'>                      Data Retirada   </TableHeaderColumn> */}
          {/* <TableHeaderColumn width='20%' dataField='dataD'  dataAlign='center'>                      Data Devolução   </TableHeaderColumn> */}
          <TableHeaderColumn width='0%' dataField='usuario_id'>                                      Usuario Id </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField='Saidas' dataAlign='center'>                      Quantidade       </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='codigo' dataAlign='center'>      Codigo                           </TableHeaderColumn>
          <TableHeaderColumn width='40%' dataField='descricao' dataAlign='center'>                                      Produto         </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='nome'dataAlign='center'>                                           Solicitante      </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField="button" dataFormat={buttonFormatter.bind(this)} dataAlign='center'> Devolução        </TableHeaderColumn>
        </BootstrapTable>
        <Modal cabecalho="Almocharifado" divID="invisivel" divNum="invisivel" mensagem="Gostaria de confimar a devolução"  modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
      </div>
    );
  }
}
