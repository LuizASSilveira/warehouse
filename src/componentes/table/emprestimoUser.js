import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modalEmprestimo'
export default class Table extends Component {
  constructor() {
    super()
    this.state = { txt:'', products: [], modal: false, qtd: 1, qtdMAX: 0 }
    this.toggle = this.toggle.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:3001/estoque/emprestimo')
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
      qtdMAX: row.quantidade,
      modal: !this.state.modal,
    })
  }
  setQuantidade(valor) {
    this.setState({ qtd: valor });
  }
  setText(event){
    this.setState({ txt: event.target.value });
  }
  
  render() {
    const options = {
      noDataText: 'Não há dados.',
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
          <TableHeaderColumn             dataField='id' isKey>                       iD                               </TableHeaderColumn>
          <TableHeaderColumn width='0%'  dataField='data'>                           Data                             </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade' dataAlign='center'>  Quantidade Disponivel            </TableHeaderColumn>
          <TableHeaderColumn width='70%' dataField='descricao'>                      Produto                          </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField="button"     dataFormat={buttonFormatter.bind(this)}> Emprestimo   </TableHeaderColumn>
        </BootstrapTable>

        <Modal max={this.state.qtd} valueText={this.state.txt} funcText={this.setText.bind(this)} func={this.setQuantidade.bind(this)}  value={this.state.qtd} modal={this.state.modal} onCancel={this.funcCancel.bind(this)} onConfirm={this.funcConfirm.bind(this)} toggle={true} />
      </div>
    );
  }
}
