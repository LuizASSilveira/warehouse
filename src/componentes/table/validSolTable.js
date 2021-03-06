import React from "react";
import { BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import '../css/validSolTable.css'
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
          <TableHeaderColumn        width='14%' dataField="data"       dataAlign='center'>      Data        </TableHeaderColumn>
          <TableHeaderColumn isKey  width='10%' dataField="siorg"      dataAlign='center'>      SIORG       </TableHeaderColumn>
          <TableHeaderColumn        width='11%' dataField="quantidade" dataAlign='center'>      Quantidade  </TableHeaderColumn>
          <TableHeaderColumn        width='50%' dataField="descricao"  dataAlign='center'>      Descrição   </TableHeaderColumn>
          <TableHeaderColumn        width='15%' dataField="status"     dataAlign='center'>      Estado      </TableHeaderColumn>
        </BootstrapTable>

      </div>
    );
  }
}
export default ValidaSolTable;