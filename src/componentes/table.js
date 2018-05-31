import React, { Component } from 'react';
import './css/table.css'
import {BootstrapTable, TableHeaderColumn} from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var lista = []
class Table extends Component {
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
      function onRowSelect(row, isSelected) {
        if (isSelected) {
          lista.push(row.id);
          console.log(lista)
          return false;
        }
      }

      var selectRowProp = {
        mode:    'checkbox',
        bgColor: 'pink', 
        hideSelectColumn: true, 
        clickToSelect: true,
        onSelect: onRowSelect
      };

      return (
        <div id ="table">
          <BootstrapTable
            data = { this.state.products } selectRow={ selectRowProp } 
            pagination
            >
            <TableHeaderColumn dataField='id' isKey>  Product ID    </TableHeaderColumn>
            <TableHeaderColumn dataField='descricao'> Product Name  </TableHeaderColumn>
            <TableHeaderColumn dataField='status'>    Product Price </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
  export {Table}