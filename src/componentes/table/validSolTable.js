import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn,DeleteButton } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";

class ValidaSolTable extends React.Component {
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

  handleDeleteButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    console.log('This is my custom function for DeleteButton click event');
    onClick();
  }

  createCustomDeleteButton = (onClick) => {
    return (
      <DeleteButton
        btnText='CustomDeleteText'
        btnContextual='btn-success'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ e => this.handleDeleteButtonClick(onClick) }/>
    );
    // If you want have more power to custom the child of DeleteButton,
    // you can do it like following
    // return (
    //   <DeleteButton
    //     btnContextual='btn-warning'
    //     className='my-custom-class'
    //     onClick={ () => this.handleDeleteButtonClick(onClick) }>
    //     { ... }
    //   </DeleteButton>
    // );
  }

  render() {
    const options = {
      deleteBtn: this.createCustomDeleteButton
    };
    const selectRow = {
      mode: 'checkbox'
    };
    return (
      <div>
        <p className="Table-header">Solicitações</p>
        <BootstrapTable             
          data = { this.state.products } 
        >
          <TableHeaderColumn isKey dataField="siorg">
            SIORG
          </TableHeaderColumn>
          <TableHeaderColumn dataField="data">Data</TableHeaderColumn>
          <TableHeaderColumn dataField="descricao">Descrição</TableHeaderColumn>
          <TableHeaderColumn dataField="qtde">Quantidade</TableHeaderColumn>
          <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default ValidaSolTable;