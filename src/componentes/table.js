import React, { Component } from 'react';
import './css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Modal from '../componentes/confirmModal';
import { Button, Input } from 'reactstrap';
import './css/input.css'

var selected = []
function onRowSelect(row, isSelected) {
  if (isSelected) {
    selected.push(row.id)
  } else {
    selected.pop(row.id)
  }
}
var selectRowProp = {
  clickToSelect: true,
  mode: 'checkbox',
  bgColor: 'pink',
  onSelect: onRowSelect
};
class Table extends Component {

  constructor() {
    super()
    this.state = { products: [], modal: false, name: '' }
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  funcConfirm() {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({nome: this.state.name ,solicitacoes: selected}),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch(this.props.urlPost, requestInfo)
      .then(response => {
        if (response.ok) {
          //alerta dados salvos com sucesso
          console.log("tudo ok")
        } else {
          throw new Error("não foi possivel salvar as alterações");
        }
      })
    
    this.funcCancel()  
}

  funcCancel() {
    this.setState({modal:false})
  }
  toggle() {
    
    this.setState({modal:true})
    if (selected.length !== 0) {
      this.setState({
        modal: !this.state.modal
      })
    }
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
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {

    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          search={true}
          pagination
          searchPlaceholder='Pesquisar'
          options={{noDataText: 'Não há dados.'}}
        >
          <TableHeaderColumn dataField='id' isKey>  ID                                 </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.descricaoL}> {this.props.descricao}  </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.dataL}>      {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.statusL}>    {this.props.status}     </TableHeaderColumn>
          <TableHeaderColumn dataField={this.props.nomeL}>      {this.props.nome}       </TableHeaderColumn>
        </BootstrapTable>

        <div id="InputButton">
          <Input id="nome" type="text" name="nome" value={this.state.value} onChange={this.handleChange} />
          <Button id="buttonPost" color="danger" onClick={this.toggle}>{this.props.buttonName}</Button>

        </div>
        <Modal modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'} />
      </div>
    );
  }
}
export { Table }