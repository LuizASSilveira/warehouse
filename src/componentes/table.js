import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Table extends React.Component {
    constructor(){
        super()
        this.state = {products:[]}
    }
    
    componentDidMount(){
        fetch('https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json')
        .then(response => response.json())
        .then(product => {         
        this.setState({products:product});
        });      
    }
    
    render() {
      return (
        <div>
          <BootstrapTable
            data = { this.state.products }
            pagination>
            <TableHeaderColumn dataField='id' isKey>  Product ID    </TableHeaderColumn>
            <TableHeaderColumn dataField='descricao'> Product Name  </TableHeaderColumn>
            <TableHeaderColumn dataField='status'>    Product Price </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
  export {Table}