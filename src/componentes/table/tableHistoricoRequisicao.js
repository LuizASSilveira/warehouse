import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
class Table extends Component {
  constructor(props) {
    super(props)
    this.state = { products: [], id:'' , redirect : false }
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
    this.setState({ id: row.id})
    this.setState({ redirect: true })
  }
  render() {
    
    const selectRowProp = {
          clickToSelect: true,
          hideSelectColumn: true,
          mode: 'radio',
          bgColor:'#98FB98',
          clickToExpand: true
    };
    const options ={
      noDataText: 'Não há dados.',
      onRowDoubleClick: this.onRowClick
        
    }
    if (this.state.redirect) {
      this.props.history.push('/requisicao/editar/'+this.state.id);
    }
    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          hover={true}

          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn width='0%' dataField='id' isKey>  ID                                 </TableHeaderColumn>
          <TableHeaderColumn width='22%' dataField={this.props.dataL} dataAlign='center'>          {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn width='22%' dataField={this.props.numeroL} dataAlign='center'>        {this.props.numero}  </TableHeaderColumn>
          <TableHeaderColumn width='22%' dataField={this.props.nomeL} dataAlign='center'>          {this.props.nome}       </TableHeaderColumn>
          <TableHeaderColumn width='22%' dataField={this.props.solicitanteL} dataAlign='center'>   {this.props.solicitante}     </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
export { Table }