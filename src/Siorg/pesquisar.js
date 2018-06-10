import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableSiorg} from '../componentes/table/siorgTable';

export default class Criar extends Component {     
    render(){
       
        return(
            <div>
                <Nav    isadm = {true} />

                <TableSiorg  buttonName= {'Criar Requisicao'}
                        urlGet=     {'https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/siorg.json'}
                        
                        descricao=  {'Descrição'}
                        siorg=      {'Siorg'}
                        data=       {'Data'}
                        

                        descricaoL=  {'descricao'}
                        siorgL=      {'siorg'}
                        dataL=       {'data'}
                        
                />                   
            </div>
        )
    }
}

