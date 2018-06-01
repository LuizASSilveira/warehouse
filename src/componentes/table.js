import React, { Component } from 'react';
import './css/table.css'
import {BootstrapTable, TableHeaderColumn} from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Button}  from 'reactstrap';
import Teste from '../componentes/confirmModal';

var selected= []
function onRowSelect(row, isSelected, e) {
  if(isSelected){
    selected.push(row.id)
  }else{
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
    constructor(){
        super()
        this.state = {products:[],modal: false}
        this.toggle= this.toggle.bind(this)
        this.funcCancel= this.funcCancel.bind(this)
        this.funcConfirm= this.funcConfirm.bind(this)
    }
    componentDidMount(){
        fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json')
        .then(response => response.json())
        .then(product => {         
        this.setState({products:product});
        });      
    }    
  	funcConfirm(){
      console.log("salvo")
      }
    funcCancel(){
      this.toggle()
    }
    toggle(){
      if(selected.length !== 0){
        this.setState({
          modal: !this.state.modal
        })
      }
    }
    render(){
      let modal = ""
  		if(this.state.modal){
  		modal = <Teste onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'}/>
  		}
      return (
        <div id ="table">
          <BootstrapTable
            data = { this.state.products } selectRow={ selectRowProp }
            pagination
            >
            <TableHeaderColumn dataField='id' isKey>  ID    </TableHeaderColumn>
            <TableHeaderColumn dataField='descricao'> Product Name  </TableHeaderColumn>
            <TableHeaderColumn dataField='status'>    Product Price </TableHeaderColumn>
          </BootstrapTable>
          <Button color="danger" onClick={this.toggle}>{this.props.buttonName}</Button>
				  {modal}
        </div>
      );
    }
  }
  export {Table}