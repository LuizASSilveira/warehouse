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

  render() {
    let feed
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
           <div className='anything'>
                <p>{this.props.match.params.id}</p>
                <InputG label={'Siorg:'}      disabled={true}   value={this.state.selected.siorg} />
                <InputG label={'Data'}        disabled={true}   value={this.state.selected.data} />
                <InputG label={'Descricao:'}  disabled={'true'} value={this.state.selected.descricao} />
                <InputG label={'Quantidade:'} disabled={'true'} value={this.state.selected.quantidade} />
                <Input type="select" name="select" id="exampleSelect" value={this.state.selected.status} onChange={this.setselect}>
                    {this.loadSelect()}
                </Input>
                {feed}
                <OrcamentosTable urlGet={'https://rawgit.com/caionakai/8f1f95eea65eef8797e89ed4b0ac34e9/raw/a42343357eaf8a7c82ce9e5db5e06318c41c4672/orc.json'} />
                </div>
            </div>
    )
  }
}