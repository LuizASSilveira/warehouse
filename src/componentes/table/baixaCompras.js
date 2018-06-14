import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal'

export default class Table extends Component {
    constructor() {
        super()
        this.state = { products: [], modal: false, qtd : 0 ,id : 0, checked : true, qtdMAX: 0}
        this.toggle = this.toggle.bind(this)
        this.funcCancel = this.funcCancel.bind(this)
        this.funcConfirm = this.funcConfirm.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:3001/estoque/requisitado", {
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
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({quantidade: this.state.qtd, solicitacoes: this.state.id}),
            headers: new Headers({
              'Content-type': 'application/json',
              'token': localStorage.getItem('auth-token')
            })
          };
          fetch(this.props.urlPost, requestInfo)
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
        this.setState({ modal: !this.state.modal })
    }

    toggle(row) {
        this.setState({
            modal:  !this.state.modal,
            qtd :   row.quantidade,
            id  :   row.id,
            qtdMAX: row.quantidade
        })
    }

    setQuantidade(valor){
        this.setState({ qtd: valor }); 
    }

    setGroup(){
        this.setState({ checked : !this.state.checked }); 
    }

    render() {
        const options = {
            noDataText: 'Não há dados.',
        }
        function buttonFormatter(cell, row) {
            return <Button color="primary" onClick={() => this.toggle(row)} >Carregar</Button>;
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
                    <TableHeaderColumn dataField='solicitacao_id' isKey>  ID                                                                      </TableHeaderColumn>
                    <TableHeaderColumn width='15%' dataField='quantidade' dataAlign='center'>  Quantidade                             </TableHeaderColumn>
                    <TableHeaderColumn width='20%' dataField='requisicao_id' dataAlign='center'>  Requisição                             </TableHeaderColumn>
                    <TableHeaderColumn width='50%' dataField='descricao'> Descrição                                                   </TableHeaderColumn>  
                    <TableHeaderColumn width='0%' dataField='requisicao_data'>         Data                                                      </TableHeaderColumn>
                    <TableHeaderColumn width='15%' dataField="button" dataFormat={buttonFormatter.bind(this)}> Carregar Estoque       </TableHeaderColumn>
                </BootstrapTable>

                <Modal max= {this.state.qtd}  onChange={this.setGroup.bind(this)} check={this.state.checked} func={this.setQuantidade.bind(this)} label='Produtos Recebidos' value={this.state.qtd} modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} />
            </div>
        );
    }
}
