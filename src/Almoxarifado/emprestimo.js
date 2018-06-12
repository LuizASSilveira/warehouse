import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import Table from "../componentes/table/emprestimoUser";

export default class AlmoPedidos extends Component {     
    render(){
        return(
            <div>
                <Nav isadm = {true} />
                <Table  />
            </div>
        )
    }
}

