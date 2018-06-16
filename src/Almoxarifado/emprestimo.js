import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import Table from "../componentes/table/emprestimoUser";

export default class AlmoPedidos extends Component {     
    render(){
        return(
            <div>
                <Nav />
                <h4 id="table">Empréstimo de Produtos</h4>
                <Table  />
            </div>
        )
    }
}

