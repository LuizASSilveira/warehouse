import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PropTypes } from 'prop-types'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap';

export default class TableSiorg extends Component {
    constructor(props) {
        super(props)
        this.state = { lista: [], normal: true }
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

    // componentDidMount() {
    //     fetch("https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/siorg.json")
    //         .then(response => response.json())
    //         .then(product => {
    //             this.setState({ lista: product });
    //         });
    // }

    properFunc(row, isSelected) {
        this.setState({ normal: false })

        if (this.props.a) {
            this.props.a(row, isSelected)
        }
    }

    excluir(row) {

        const requestInfo = {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'token': localStorage.getItem('auth-token')
            })
        };
        fetch(this.props.urlDelete + row.siorg, requestInfo)
            .then(response => {
                if (response.ok) {
                    //alerta dados salvos com sucesso
                    window.location.reload()
                } else {
                    throw new Error("não foi possivel salvar as alterações");
                }
            })
    }

    

    render() {
        const options = {
            noDataText: 'Não há dados.',
        };

        let self = this;
        function buttonFormatter(cell, row) {
            return <Button color="danger" onClick={() => self.excluir(row)} >X</Button>;
        }
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
                    options={ options }

                >
                    <TableHeaderColumn width='10%' dataField="siorg" isKey>     Código Siorg                </TableHeaderColumn>
                    <TableHeaderColumn width='60%' tdStyle={ { whiteSpace: this.state.normal? 'normal':'' } } dataField="descricao">       Descrição                   </TableHeaderColumn>
                    <TableHeaderColumn width='10%' dataField="button" dataFormat={buttonFormatter} > Remover </TableHeaderColumn>
                </BootstrapTable>


            </div>
        );
    }

}
TableSiorg.propTypes = {
    a: PropTypes.func
};
export { TableSiorg }