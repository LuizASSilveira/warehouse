import React from "react";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import InputG from "../inputGenerico";
import '../css/validSolTable.css'
import {Redirect} from 'react-router-dom'
import '../css/table.css'


class ValidaSolTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
    }
    this.onRowClick = this.onRowClick.bind(this);
  }


  componentDidMount() {
    fetch(this.props.urlGet, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    }).then(response => response.json())
      .then(product => {
        this.setState({ products: product });
      });
  }


  onRowClick(row){
    this.props.teste.push('/solicitacao/validar/'+row.id)

  }

  render() {
    const selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
    }


    const options ={
      noDataText: 'Não há dados.',
      onRowClick: this.onRowClick
        
    }

  
    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          searchPlaceholder='Pesquisar'
          hover={true}
          search={true}
          pagination
          options={options}
        >
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="quantidade">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Estado</TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}

export default ValidaSolTable;