import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PropTypes } from 'prop-types'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button } from 'reactstrap';
import ExpandTable from './expand'

export default class TableSiorg extends Component {
    constructor(props) {
        super(props)
        this.state = { lista: [], isAdm:false }
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

        let adm
        adm = localStorage.getItem('isAdm')
        console.log(adm)
        if(adm === "false"){
            this.setState({ isAdm: false })
        }else{
            this.setState({ isAdm: true })
        }
    }
    componentDidUpdate(){
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
        if (this.props.a) {
            this.props.a(row, isSelected)
        }
        console.log(row)
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

    expandComponent(row) {
    return (
      console.log(row),
      <ExpandTable data={ row } siorg={true} />
    );
  }

  isExpandableRow(row) {
    return true;

  }

    render() {

        let self = this;
        function buttonFormatter(cell, row) {
            return <Button color="danger" onClick={() => self.excluir(row)} >X</Button>;
        }
        let selectRowProp;
        if(this.props.b){
           selectRowProp = {
            onSelect: this.properFunc
           }
        }else{
          selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: 'grey',
            onSelect: this.properFunc
        }
        }

        let ganbis                
        if(this.state.isAdm){
            
            ganbis = <TableHeaderColumn width='10%' dataField="button" dataFormat={buttonFormatter}> Remover   
        </TableHeaderColumn>
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
                    expandComponent={ this.expandComponent }
                    expandableRow={ this.isExpandableRow }
                    options={{ noDataText: 'Não há dados.' }}
                >
                    <TableHeaderColumn width='10%' dataField="siorg" isKey>     Código Siorg     </TableHeaderColumn>
                    <TableHeaderColumn width='60%' dataField="descricao">       Descrição  </TableHeaderColumn>
                    
                    {ganbis}
                </BootstrapTable>


            </div>
        );
    }

}
TableSiorg.propTypes = {
    a: PropTypes.func,
    b:PropTypes.func
};
export { TableSiorg }