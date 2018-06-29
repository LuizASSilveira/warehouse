import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableSiorg} from '../componentes/table/siorgTable';
import '../componentes/css/input.css'

export default class Criar extends Component {
    render(){
       
        return(
            <div>
                <Nav/>
                <h4 id="table">Tabela Siorg</h4>

                <TableSiorg  desativarSelect={true} buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/produtos'}
                        urlDelete= {'http://localhost:3001/produtos/'}
                        
                        descricao=  {'Descrição'}
                        siorg=      {'Siorg'}
                        

                        descricaoL=  {'descricao'}
                        siorgL=      {'siorg'}
                        
                />                   
            </div>
        )
    }
}

