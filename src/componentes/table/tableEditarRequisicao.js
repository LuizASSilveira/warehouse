import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Button, Input } from 'reactstrap';
import Modal from '../confirmModal'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'

const options = {
  noDataText: 'Não há dados.',

};
class TableEditar extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false, numero: '', disabled: false }
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
    this.handleChange = this.handleChange.bind(this);

  }
  funcConfirm() {
    if (this.state.numero !== '') {
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify({ numero: this.state.numero }),
        headers: new Headers({
          'Content-type': 'application/json',
          'token': localStorage.getItem('auth-token')
        })
      };
      fetch(this.props.urlPut2, requestInfo)
        .then(response => {
          if (response.ok) {
            //alerta dados salvos com sucesso
            window.location.reload()
          } else {
            throw new Error("não foi possivel salvar as alterações");
          }
        })
    }
    this.funcCancel()
  }
  funcCancel() {
    this.setState({ modal: false })
  }
  toggle() {
    this.setState({ modal: true })
  }
  componentDidMount() {
    fetch(this.props.urlGet, {
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

    fetch(this.props.urlGet2, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(number => {
        this.setState({ numero: number });
        if (number !== "Não Definido") {
          this.setState({ disabled: true })
        }

      });
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  excluir(row) {
    console.log(row.id)

    const requestInfo = {
      method: 'DELETE',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch(this.props.urlDelete + row.id, requestInfo)
      .then(response => {
        if (response.ok) {
          //alerta dados salvos com sucesso
          window.location.reload()
        } else {
          throw new Error("não foi possivel salvar as alterações");
        }
      })
    //reload pagina
  }

  render() {
    let self = this;
    function buttonFormatter(cell, row) {
      console.log(row.id)
      return <Button color="danger" onClick={() => self.excluir(row)} >X</Button>;
    }
    return (
      <div id="table">
        <div id="InputButtonEditar">
          <Input placeholder="Nº Requisição" id="nome" type="text" name="nome" value={this.state.numero} disabled={this.state.disabled} />
          <Button id="buttonPostEdit" color="primary" onClick={this.toggle}>{this.props.buttonName}</Button>
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
          <TableHeaderColumn dataField={this.props.nomeL}>      {this.props.nome}       </TableHeaderColumn>
          <TableHeaderColumn dataField="button" dataFormat={buttonFormatter}> Remover   </TableHeaderColumn>
        </BootstrapTable>
        <Modal modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'} />

      </div>
    );
  }
}
export { TableEditar }