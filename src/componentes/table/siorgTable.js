import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {PropTypes} from 'prop-types'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


export default class TableSiorg extends Component {
    constructor(props) {
        super(props)
        this.state = { lista: []}
        this.properFunc = this.properFunc.bind(this)
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

        properFunc(row, isSelected, e) {
          console.log(row)
          this.props.a(row)
        }
    
    render() {
        const selectRowProp = {
           mode: 'radio',
           hideSelectColumn: true,
           clickToSelect: true,
           bgColor: 'grey',
           onSelect: this.properFunc
        }

        return (
            <div id="table">
                <BootstrapTable
                    data={this.state.lista}
                    search={true}
                    pagination
                    hover={true}
                    selectRow={selectRowProp}
                    searchPlaceholder='Pesquisar'
                    options={{noDataText: 'Não há dados.'}}
                >
                    <TableHeaderColumn dataField='id' isKey>  ID                                 </TableHeaderColumn>
                    <TableHeaderColumn dataField="siorgL">     Nº Siorg     </TableHeaderColumn>
                    <TableHeaderColumn dataField="descricaoL">       Descricao  </TableHeaderColumn>

                </BootstrapTable>


            </div>
        );
    }

}
TableSiorg.propTypes = {
    a: PropTypes.func
};
export { TableSiorg }