import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class SolicitacoesTable extends Component {
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
  render() {
    return (
      <div>
        <p className="Table-header">Solicitações</p>
        <BootstrapTable             
            data = { this.state.products } 
            search={ true }
            pagination>
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="qtde">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default SolicitacoesTable;
