import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


class TableSiorg extends Component {
    constructor() {
        super()
        this.state = { lista: []}
      }

      componentDidMount() {
        fetch(this.props.urlGet, {
          method: 'GET',
          //headers: new Headers({
            //'Content-type': 'application/json',
            //'token': localStorage.getItem('auth-token')
          //})
        })
          .then(response => response.json())
          .then(product => {
            this.setState({ lista: product });
          });
      }
    
    render() {

        return (
            <div id="table">
                <BootstrapTable
                    data={this.state.lista}
                    search={true}
                    pagination
                    searchPlaceholder='Pesquisar'
                    options={{noDataText: 'Não há dados.'}}
                >
                    <TableHeaderColumn dataField={this.props.siorgL} isKey>     {this.props.siorg}     </TableHeaderColumn>
                    <TableHeaderColumn dataField={this.props.dataL}>      {this.props.data}       </TableHeaderColumn>
                    <TableHeaderColumn dataField={this.props.descricaoL}> {this.props.descricao}  </TableHeaderColumn>

                </BootstrapTable>


            </div>
        );
    }

}
export { TableSiorg }