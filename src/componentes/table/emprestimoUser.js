import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modalEmprestimo'
export default class Table extends Component {
  constructor() {
    super()
    this.state = { txt: '', estoqueId: 0, products: [], modal: false, qtd: 1, rowId:0, qtdMAX: 0, redirect: false}
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:3001/estoque')
      .then(response => response.json())
      .then(product => { 
        this.setState({ products: product });
      });
  }

  funcConfirm() {
    if (this.state.qtd !=='') {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({
          estoque_id: this.state.estoqueId,
          quantidade: this.state.qtd,
          local: this.state.txt,
        }),
        headers: new Headers({
          'Content-type': 'application/json',
          'token': localStorage.getItem('auth-token')
        })
      };
      fetch('http://localhost:3001/estoque/emprestimo', requestInfo)
        .then(response => {
          if (response.ok) {
            window.location.reload()
          } else {
            console.log("não foi possivel salvar as alterações");
          }
        })
    }
    this.funcCancel()
  }
  funcCancel() {
    this.setState({ modal: false })
  }
  toggle(row) {
    this.setState({
      qtdMAX: row.quantidade,
      estoqueId: row.estoqueId,
      modal: !this.state.modal,
      siorg : row.produto_id
    })
  }
  setQuantidade(valor) {
    this.setState({ qtd: valor });
  }
  setText(event) {
    this.setState({ txt: event.target.value });
  }

  onRowClick(row){
    this.props.history.push("/almoxarifado/info/" + row.estoqueId);
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
      onRowDoubleClick: this.onRowClick.bind(this),
    }
    function buttonFormatter(cell, row) {
      return <Button color="primary" onClick={() => this.toggle(row)} >Emprestar</Button>;
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
          <TableHeaderColumn dataField='estoqueId' isKey>                            iD                               </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade' dataAlign='center'>  Quantidade Disponivel            </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='codigo' dataAlign='center'>      Codigo                           </TableHeaderColumn>
          <TableHeaderColumn width='60%' dataField='descricao'>                      Produto                          </TableHeaderColumn>
          <TableHeaderColumn width='14%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Emprestimo       </TableHeaderColumn>
        </BootstrapTable>
        <Modal max={this.state.qtdMAX} valueText={this.state.txt} funcText={this.setText.bind(this)} func={this.setQuantidade.bind(this)} value={this.state.qtd} modal={this.state.modal} onCancel={this.funcCancel.bind(this)} onConfirm={this.funcConfirm.bind(this)} toggle={true} />

      </div>
    );
  }
}
