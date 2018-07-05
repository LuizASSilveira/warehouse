import React, { Component } from 'react';
import Nav      from    '../componentes/navbarAdm';
import Table    from    '../componentes/table/almDevolucao' 

export default class AlmoEmprestimo extends Component {     
    render(){
        return(
            <div>
                <Nav  />
                <h4 id="table">Devolução de Produtos</h4>
                <Table />    
            </div>
        )
    }
}
