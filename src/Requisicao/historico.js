import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table/tableHistoricoRequisicao';

export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav isadm = {true} />
                
                <Table  buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/requisicoes'}
                        dataL=      {"data"}
                        numeroL=    {"numero"}
                        nomeL=      {"nome"}
                        solicitanteL={'solicitante'}

                        data=           {"data"}
                        numero=         {"numero"}
                        nome=           {"nome"}
                        solicitante=    {'solicitante'}
    
                        />                   
            </div>
        )
    }
}

