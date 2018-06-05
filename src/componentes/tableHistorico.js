import React, { Component } from 'react';
import './css/table.css'
import {BootstrapTable, TableHeaderColumn} from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class Table extends Component {
    constructor(props){
        super(props)
        this.state = {products:[]}
    }
    componentDidMount(){
        fetch(this.props.urlGet + '')
        .then(response => response.json())
        .then(product => {         
        this.setState({products:product});
        });      
    }      	
    render(){
      return (
        <div id ="table">
          <BootstrapTable
            data = { this.state.products } 
            search={ true }
            pagination
            >
            <TableHeaderColumn dataField= 'id' isKey>  ID                                  </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.descricao}> {this.props.descricao}  </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.status}>    {this.props.status}     </TableHeaderColumn>
            <TableHeaderColumn dataField= {this.props.data}>      {this.props.data}       </TableHeaderColumn>
          </BootstrapTable>
          
        </div>
      );
    }
  }
  export {Table}