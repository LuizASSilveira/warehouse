import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class OrcamentosTable extends Component {
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
        <p className="Table-header">Orçamentos</p>
        <BootstrapTable 
         data = { this.state.products } 
         searchPlaceholder='Pesquisar'
         options={{noDataText: 'Não há dados.'}}
        >
          <TableHeaderColumn isKey dataField="cnpj">
            CNPJ
          </TableHeaderColumn>
          <TableHeaderColumn dataField="fornecedor">
            Fornecedor
          </TableHeaderColumn>
          <TableHeaderColumn dataField="valor">Valor R$</TableHeaderColumn>
          <TableHeaderColumn dataField="ref">Referência</TableHeaderColumn>
          <TableHeaderColumn dataField="arquivo">Arquivo</TableHeaderColumn>
          <TableHeaderColumn>Remover</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default OrcamentosTable;
