import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/tableHistorico';


export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav />
                <Table  buttonName= {'Criar Requisicao'}
                        urlGet=     {'https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json'}
                        urlPost=    {'?????????????????www'}
                        descricao=  {'descricao'}
                        status=     {'status'}
                        data=       {'data'}
                />                   
            </div>
        )
    }
}

