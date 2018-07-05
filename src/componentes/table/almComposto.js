import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/table.css'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false , codigoB: 0, id:''}
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:3001/estoque/validarProduto')
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product })
      });
  }
  funcConfirm() {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({codigo: this.state.codigoB, id: this.state.id}),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch('http://localhost:3001/estoque/validarProdutos', requestInfo)
      .then(response => {
        if (response.ok) {
          //alerta dados salvos com sucesso
          //this.props.history.push('/requisicao/historico');
          console.log("Fumego")
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
      id: row.id,
      modal: !this.state.modal
    })
  }
  setCodigo(valor){
    this.setState({
      codigoB : valor,
    })
  }
  render(){
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      return <Button color="primary" value={this.state.codigoB} onClick={() => this.toggle(row)} >Carregar Estoque</Button>
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
          <TableHeaderColumn width='12%' dataField='id' isKey>                                       ID               </TableHeaderColumn>
          <TableHeaderColumn width='30%' dataField='descricao'>                                      Produto          </TableHeaderColumn>
          <TableHeaderColumn width='11%' dataField="button" dataFormat={buttonFormatter.bind(this)}  dataAlign='center'> Devolução        </TableHeaderColumn>
        </BootstrapTable>
        <Modal value={this.state.codigoB}  divID='invisivel' func={this.setCodigo.bind(this)} cabecalho="Almoxarifado" label="Código de Barras" modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
      </div>
    );
  }
}
