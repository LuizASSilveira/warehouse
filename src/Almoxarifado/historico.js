import React, { Component } from 'react';
import Nav      from    '../componentes/navbarAdm';
import Table    from    '../componentes/table/amlHistorico' 

export default class AlmoEmprestimo extends Component {     
    render(){
        return(
            <div>
                <Nav isadm = {true} />
                <Table />    
            </div>
        )
    }
}
