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
          headers: new Headers({
            'Content-type': 'application/json',
            'token': localStorage.getItem('auth-token')
          })
        })
          .then(response => response.json())
          .then(product => {
            this.setState({ lista: product });
          });
      }

        properFunc(row, isSelected) {
          if(this.props.a){
            this.props.a(row, isSelected)
          }
          console.log(row)
        }
    
    render() {
        const selectRowProp = {
           mode: 'radio',
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
                    <TableHeaderColumn dataField="siorg" isKey>     Código Siorg     </TableHeaderColumn>
                    <TableHeaderColumn dataField="descricao">       Descrição  </TableHeaderColumn>

                </BootstrapTable>


            </div>
        );
    }

}
TableSiorg.propTypes = {
    a: PropTypes.func
};
export { TableSiorg }