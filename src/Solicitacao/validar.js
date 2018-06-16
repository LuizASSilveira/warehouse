import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import {ErrorAlert} from '../componentes/alerta'
import ValidaSolTable from '../componentes/table/validSolTable';

export default class CriarS extends Component {     
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <Nav/>
                <h4 id="table">Validar Solicitações</h4>
                <ValidaSolTable teste={this.props.history} 
                                urlGet={'http://localhost:3001/solicitacoes/validar'}/>
                
            </div>
        )
    }
}

