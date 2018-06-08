import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn, InsertModalHeader } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputG from "../inputGenerico";
import OrcamentosTable from "./orcamentos";
import '../css/validSolTable.css'
import {Link, Redirect} from 'react-router-dom'
import Moment from 'react-moment'


class ValidaSolTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      products: [],
      redirect: false,
      id: '',
      feed: false,
      selected: { descricao: '', data: '', siorg: '', qtde: '', status: '' }
    }
    this.toggle = this.toggle.bind(this);
    this.properFunc = this.properFunc.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    fetch(this.props.urlGet, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    }).then(response => response.json())
      .then(product => {
        this.setState({ products: product });
      });
  }

  properFunc(row, isSelected, e) {
    console.log(row)
    this.setState({
      selected: row
    });
    this.toggle()
  }
  loadSelect() {
    let status = ['ABERTA', 'REQUISITADA', 'COMPRADA', 'DESERTO', 'CANCELADA']
    return status.map((stat) => {
      return <option>{stat}</option>
    })
  }

  setselect = (e) => {
    let x = this.state.selected
    x.status = e.target.value
    this.setState({ selected: x })
  }

  onRowClick(row){
    this.setState({ id: row.id})
    this.setState({ redirect : true })
  }

  render() {
    let feed
    var teste
    if (this.state.selected.status == 'CANCELADA') {
      feed = <InputG label={'Feedback:'} type={'textarea'} placeholder={'Insira um comentário para o solicitante sobre o motivo do cancelamento da solicitação.'} />
    }
    const selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
      onSelect: this.properFunc
    }

    const { handleSubmit,history }=this.props;


    const options ={
      noDataText: 'Não há dados.',
      onRowClick: this.onRowClick
        
    }

    if(this.state.redirect) {
      return(
          <Redirect to= {"/solicitacao/teste/"+this.state.id}   />
        )
      
    }
  
    return (
      <div className="teste">
        <p className="Table-header">Selecione a solicitação para valida-lá.</p>
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          searchPlaceholder='Pesquisar'
          hover={true}
          options={options}
        >
        {console.log(this.state.products[0])}
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="quantidade">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default ValidaSolTable;