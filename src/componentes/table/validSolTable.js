import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn, InsertModalHeader } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputG from "../inputGenerico";
import OrcamentosTable from "./orcamentos";
import '../css/validSolTable.css'



class ValidaSolTable extends React.Component {
	constructor(props){
        super(props)
        this.state = {
       		modal: false,
       		products:[],
          feed: false,
       		selected: {descricao:'', data: '', siorg: '', qtde:'', status: ''}
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
    fetch(this.props.urlGet + '')
      .then(response => response.json())
      .then(product => {
        this.setState(
          {
            products: product
          }
        );
      });
  }

    properFunc(row, isSelected, e){
    	console.log(row)
    	this.setState({
     	 selected: row
   		});
    	this.toggle()
    }
    loadSelect(){
    	let status = ['ABERTA','REQUISITADA', 'COMPRADA', 'DESERTO', 'CANCELADA']
    	return status.map( (stat)=>{
    			return <option>{stat}</option>
      })
    }

    setselect = (e) =>{
      let x = this.state.selected
      x.status= e.target.value
      this.setState({selected: x})
    }

  render() {
    let feed
    if(this.state.selected.status == 'CANCELADA'){
      feed = <InputG label={'Feedback:'} type={'textarea'} placeholder={'Insira um comentário para o solicitante sobre o motivo do cancelamento da solicitação.'}/>
    }
  	const selectRowProp = {
 		 mode: 'radio',
 		 hideSelectColumn: true,  
 		 clickToSelect: true,
 		 onSelect: this.properFunc
	}
    return (
      <div className="teste">
        <p className="Table-header">Selecione a solicitação para valida-lá.</p>
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          searchPlaceholder='Pesquisar'
          options={{ noDataText: 'Não há dados.' }}
          hover={true}
        >
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="qtde">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
          <ModalHeader toggle={this.toggle}> Validar Solicitação </ModalHeader>
          <ModalBody>
           <div className='anything'>
           <InputG label={'Siorg:'} disabled={true} value={this.state.selected.siorg}/>
           <InputG label={'Data'} disabled={true} value={this.state.selected.data}/>    
           <InputG label={'Descricao:'} disabled={'true'} value={this.state.selected.descricao} />
           <InputG label={'Quantidade:'} disabled={'true'}  value={this.state.selected.qtde}/>		   
           <Input type="select" name="select" id="exampleSelect" value={this.state.selected.status} onChange={this.setselect}>
            { this.loadSelect() }
           </Input>
           {feed}
           </div>
          </ModalBody>
          <OrcamentosTable urlGet={'https://rawgit.com/caionakai/8f1f95eea65eef8797e89ed4b0ac34e9/raw/a42343357eaf8a7c82ce9e5db5e06318c41c4672/orc.json'} />
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Validar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ValidaSolTable;