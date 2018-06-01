import React, { Component } from 'react';
import './css/table.css'
import {BootstrapTable, TableHeaderColumn} from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Teste from '../componentes/confirmModal';
import {Button}  from 'reactstrap';

var selected= []
function onRowSelect(row, isSelected) {
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
    constructor(props){
        super(props)
        this.state = {products:[],modal: false}
        this.toggle= this.toggle.bind(this)
        this.funcCancel= this.funcCancel.bind(this)
        this.funcConfirm= this.funcConfirm.bind(this)
    }
    
    funcConfirm(){
        const requestInfo = {
          method:'POST',
          body:JSON.stringify({selected}),
          headers: new Headers({
            'Content-type':'application/json'
          })
        };
        fetch(this.props.urlPost,requestInfo)
          .then(response => {
            if(response.ok){
              //alerta dados salvos com sucesso
              console.log("tudo ok")
            } else {
              throw new Error("não foi possivel salvar as alterações");
            }
          })
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
    componentDidMount(){
        fetch(this.props.urlGet + '')
        .then(response => response.json())
        .then(product => {         
        this.setState({products:product});
        });      
    }    
  	
    render(){
      let modal = ""
        
      if(this.state.modal){
      modal = <Teste onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'}/>
      }
      return (
        <div id ="table">
          <BootstrapTable
            data = { this.state.products } 
            selectRow={ selectRowProp }
            search={ true }
            pagination
            >
            <TableHeaderColumn dataField= 'id' isKey>  ID                                  </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.descricao}> {this.props.descricao}  </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.status}>    {this.props.status}     </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.data}>      {this.props.data}       </TableHeaderColumn>
          </BootstrapTable>
          
          <Button id="buttonPost" color="danger" onClick={this.toggle}>{this.props.buttonName}</Button>
				    {modal}
        </div>
      );
    }
  }
  export {Table}