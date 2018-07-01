import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap'
import Modal from '../modal-almoxarifado/modal2'

export default class Table extends Component {
    constructor() {
        super()
        this.state = {valor: 0 ,arrayForn: [] , products: [], modal: false, qtd : 0 ,id : 0, checked : true, qtdMAX: 0, idSolicitacao: 0}
        this.toggle = this.toggle.bind(this)
        this.funcCancel = this.funcCancel.bind(this)
        this.funcConfirm = this.funcConfirm.bind(this)
        this.orcamentoID = this.orcamentoID.bind(this)   
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
  
    funcConfirm() {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({  
                orcamento_id:   this.state.valor,
                solicitacao_id: this.state.idSolicitacao,
                quantidade:     this.state.qtd,
                unico:          this.state.checked,                              
            }),
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
                console.log("não foi possivel salvar as alterações");
              }
            })
            
        this.funcCancel()
    }
    funcCancel() {
         this.setState({ modal: !this.state.modal })
    }

    toggle(row) {
        fetch("http://localhost:3001/orcamentos/"  + row.solicitacao_id  , {
        method: 'GET',
        headers: new Headers({
            'Content-type': 'application/json',
            'token': localStorage.getItem('auth-token')
        })
        }).then(response => response.json())
        .then(product => {
            console.log(product[0].id)
            this.setState({ arrayForn: product, 
                            valor:  product[0].id,
                        });
        })
        this.setState({
            qtd :           row.quantidade,
            qtdMAX:         row.quantidade,
            idSolicitacao:  row.solicitacao_id,    
            modal:          !this.state.modal,
        })
    }
    setQuantidade(valor){
        this.setState({ qtd: valor }); 
    }
    setGroup(){
        this.setState({ checked : !this.state.checked }); 
    }
    orcamentoID(event) {
        this.setState({valor: event.target.value })
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
                    <TableHeaderColumn width='0%'   dataField='produto_id'      isKey>              ID              </TableHeaderColumn>
                    <TableHeaderColumn width='0%'   dataField='solicitacao_id'  >                   IDSolicitacao   </TableHeaderColumn>
                    <TableHeaderColumn width='15%'  dataField='quantidade'       dataAlign='center'>Quantidade      </TableHeaderColumn>
                    <TableHeaderColumn width='20%'  dataField='requisicao_id'    dataAlign='center'>Requisição      </TableHeaderColumn>
                    <TableHeaderColumn width='50%'  dataField='descricao'        dataAlign='center'>Descrição       </TableHeaderColumn>  
                    <TableHeaderColumn width='0%'   dataField='requisicao_data'>                    Data            </TableHeaderColumn>
                    <TableHeaderColumn width='15%'  dataField="button"           dataAlign='center'   dataFormat={buttonFormatter.bind(this)}> Carregar Estoque       </TableHeaderColumn>
                </BootstrapTable>

                <Modal orcamentoID={this.orcamentoID} valor={this.valor} idSolicitacao={this.state.idSolicitacao} Fornecedor= 'Fornecedor' array={this.state.arrayForn}  max= {this.state.qtd}  onChange={this.setGroup.bind(this)} check={this.state.checked} func={this.setQuantidade.bind(this)} label='Produtos Recebidos' value={this.state.qtd} modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm.bind(this)} toggle={true} />
            </div>
        );
    }
}
