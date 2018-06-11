import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableSiorg} from '../componentes/table/siorgTable';

export default class Criar extends Component {     
    render(){
       
        return(
            <div>
                <Nav    isadm = {true} />

                <TableSiorg  buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/produtos'}
                        
                        descricao=  {'Descrição'}
                        siorg=      {'Siorg'}
                        

                        descricaoL=  {'descricao'}
                        siorgL=      {'siorg'}
                        
                />                   
            </div>
        )
    }
}

