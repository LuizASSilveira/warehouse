import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import Table from '../componentes/table/baixaCompras'

export default class AlmoEmprestimo extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Table
                    urlGet="http://localhost:3001/estoque/requisitado"
                    urlPost="http://localhost:3001/estoque/requisitado"
                />
            </div>
        )
    }
}
