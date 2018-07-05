import React, { Component } from 'react';
import Nav   from '../componentes/navbarAdm';
import Table from '../componentes/table/almComposto'

export default class Composto extends Component {
    render() {
        return (
            <div>
                <Nav   />
                <Table />
            </div>
        )
    }
}
