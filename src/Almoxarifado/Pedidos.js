import React, { Component } from 'react';
import Nav      from    '../componentes/navbarAdm';
import Table    from    '../componentes/table/baixaCompras' 

export default class AlmoEmprestimo extends Component {     
    render(){
        return(
            <div>
                <Nav isadm = {true} />
                <Table 
                urlGet = "http://localhost:3001/estoque/requisitado"
                urlPost = "?????"
                />    
            </div>
        )
    }
}

