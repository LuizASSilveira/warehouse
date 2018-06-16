import React, { Component } from 'react';
import Nav      from    '../componentes/navbarAdm';
import Table    from    '../componentes/table/amlInfo' 

export default class AlmoEmprestimo extends Component {     
    render(){
        return(
            <div>
                <Nav  />
                <h4 id="table">Informação do Produto</h4>
                <Table />    
            </div>
        )
    }
}