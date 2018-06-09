import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import NumericInput from 'react-numeric-input';
import {ErrorAlert} from '../componentes/alerta'
import SolicitacoesTable from '../componentes/table/solicitacoes';
import ValidaSolTable from '../componentes/table/validSolTable';
import { BootstrapTable, TableHeaderColumn, InsertModalHeader } from "react-bootstrap-table";
import { Container, Input, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputG from "../componentes/inputGenerico";
import OrcamentosTable from "../componentes/table/orcamentos";
import '../componentes/css/validSolTable.css'


export default class validEspec extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      products: [],
      feed: false,
      selected: { descricao: '', data: '', siorg: '', qtde: '', status: '' }
    }
    this.toggle = this.toggle.bind(this);
    this.properFunc = this.properFunc.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

componentDidMount() {
    fetch("http://localhost:3001/solicitacoes/"+this.props.match.params.id, {
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
  properFunc(row, isSelected, e) {
    console.log(row)
    this.setState({
      selected: row
    });
    this.toggle()
  }
  loadSelect() {
    let status = ['ABERTA', 'REQUISITADA', 'COMPRADA', 'DESERTO', 'CANCELADA']
    console.log(this.state)
    return status.map((stat) => {
      return <option>{stat}</option>
    })
  }

  setselect = (e) => {
    let x = this.state.selected
    x.status = e.target.value
    this.setState({ selected: x })
  }

  render() {
    let feed
    var dado = []
    if (this.state.products.length > 0) {
        dado[0]=this.state.products[0].descricao;
        dado[1]=this.state.products[0].status;
        dado[2]=this.state.products[0].justificativa;
        dado[3]=this.state.products[0].data;
    }
    console.log(this.state.products[0])
    if (this.state.selected.status == 'CANCELADA') {
      feed = <InputG label={'Feedback:'} type={'textarea'} placeholder={'Insira um comentário para o solicitante sobre o motivo do cancelamento da solicitação.'} />
    }
    const selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
      onSelect: this.properFunc
    }    
    return(
         <div>
           <Nav isadm = {true} />
           <h3>Validar Solicitação</h3>
           <div className='anything'>
                <InputG label={'Siorg:'}      disabled={true}   value={this.state.selected.siorg} />
                <InputG label={'Data'}         value={dado[3]} />
                <InputG label={'Descricao:'}  value={dado[0]} />
                <InputG label={'Quantidade:'} value={this.state.selected.quantidade} />
                <InputG label={'Justificativa:'} value={dado[2]} />
                <Input type="select" name="select" id="exampleSelect" value={this.state.selected.status} onChange={this.setselect}>
                    {this.loadSelect()}
                </Input>
                {feed}
                <OrcamentosTable urlGet={"http://localhost:3001/solicitacoes/" + this.props.match.params.id +"/orcamentos"}/>
                </div>
            </div>
    )
  }
}