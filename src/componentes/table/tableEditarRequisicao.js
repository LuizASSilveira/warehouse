import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button, Input } from 'reactstrap';
import '../css/table.css'
import Modal from '../confirmModal'

const options = {
  noDataText: 'Não há dados.',
  onRowDoubleClick: function (row) {
    console.log(row.id)
  }
};
class TableEditar extends Component {

  constructor() {
    super()
    this.state = { products: [], modal: false }
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
    this.handleChange = this.handleChange.bind(this);
    
  }
  funcConfirm() {
    this.funcCancel()
  }
  funcCancel() {
    this.setState({ modal: false })
  }
  toggle() {
    this.setState({ modal: true })
  }
  componentDidMount() {
    fetch(this.props.urlGet)

      // componentDidMount() {
      //   fetch(this.props.urlGet, {
      //     method: 'GET',
      //     headers: new Headers({
      //       'Content-type': 'application/json',
      //       'token': localStorage.getItem('auth-token')
      //     })
      //   })
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product });
      });
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    function buttonFormatter(cell, row) {
      return <Button color="danger">X</Button>;
    }
    
    return (
      <div id="table">
        <div id="InputButtonEditar">
          <Input placeholder="Nº Requisição" id="nome" type="text" name="nome" />
          <Button id="buttonPostEdit" color="danger" onClick={this.toggle}>{this.props.buttonName}</Button>
        </div>
        
        <BootstrapTable
          data={this.state.products}
          options={options}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
        >
          <TableHeaderColumn dataField='id' isKey>  ID                                  </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.descricaoL}> {this.props.descricao}  </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataL}>      {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.statusL}>    {this.props.status}     </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.nomeL}>      {this.props.nome}       </TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={buttonFormatter}> Remover   </TableHeaderColumn>
        </BootstrapTable>
        <Modal modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'} />

      </div>
    );
  }
}
export { TableEditar }