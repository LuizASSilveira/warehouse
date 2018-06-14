import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'

export default class Table extends Component {
  constructor() {
    super()
    this.state = { products: [], modal: false, qtd: 1, qtdMAX: 0 , siorg:0 }
    this.toggle = this.toggle.bind(this)

  }

  componentDidMount() {
    fetch("http://localhost:3001/estoque/emprestimo", {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
      console.log(this.props.urlGet)    
        this.setState({ products: product });
      });
  }

  funcConfirm() {
    console.log(this.state.qtd)
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({quantidade: this.state.qtd, produto_id : this.state.siorg }),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch("http://localhost:3001/estoque/emprestimo", requestInfo)
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
      modal: !this.state.modal,
      qtdMAX: row.quantidade,
      siorg : row.produto_id
    })
  }
  setQuantidade(valor){
    this.setState({ qtd: valor }); 
  }
  render() {
    const options = {
      noDataText: 'Não há dados.',
    }
    function buttonFormatter(cell, row) {
      return <Button color="primary" onClick={() => this.toggle(row)} >Emprestar</Button>;
    }
    console.log(this.state.qtd)
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
          <TableHeaderColumn             dataField='produto_id'         isKey>       ID                               </TableHeaderColumn>
          <TableHeaderColumn width='0%'  dataField='data'>                           Data                             </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField='quantidade_atual' dataAlign='center'>  Quantidade Disponivel            </TableHeaderColumn>
          <TableHeaderColumn width='70%' dataField='descricao'>                      Produto                          </TableHeaderColumn>
          <TableHeaderColumn width='12%' dataField="button"     dataFormat={buttonFormatter.bind(this)}> Emprestimo   </TableHeaderColumn>
        </BootstrapTable>
        
        <Modal maxQtd={this.state.qtd} divID = "invisivel" func={this.setQuantidade.bind(this)} label='Quantidade de Produto' value={this.state.qtd} modal={this.state.modal} onCancel={this.funcCancel.bind(this)} onConfirm={this.funcConfirm.bind(this)} toggle={true} />
      </div>
    );
  }
}
