import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ExpandTable from './expandFeedback'

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
  expandComponent(row) {
    return (
      <ExpandTable data={ row } siorg={false} />
    );
  }

  isExpandableRow(row) {
    return true;

  }

  render() {
    
    // const selectRowProp = {
    //       clickToSelect: true,
    //       hideSelectColumn: true,
    //       mode: 'radio',
    //       bgColor: 'gray',
    // };

    const options ={
      noDataText: 'Não há dados.',
      onRowClick: this.onRowClick
        
    }
    if (this.state.redirect) {
      //return <Redirect to= {"/requisicao/editar/"+this.state.id}   />
    }

    return (
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          search={true}
          searchPlaceholder='Pesquisar'
          pagination
          hover={true}
          // selectRow={selectRowProp}
          options={options}
          expandComponent={ this.expandComponent }
          expandableRow={ this.isExpandableRow }
        >
          <TableHeaderColumn dataField='id' isKey>  ID                                 </TableHeaderColumn>
          <TableHeaderColumn width='50%' dataField={this.props.descricaoL}> {this.props.descricao}  </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField={this.props.dataL}>      {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn width='15%' dataField={this.props.statusL}>    {this.props.status}     </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField={this.props.nomeL}>      {this.props.nome}       </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
export { Table }