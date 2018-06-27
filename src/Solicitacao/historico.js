import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table/tableHistorico';
import '../componentes/css/input.css'
import {Redirect} from 'react-router'

export default class Criar extends Component {     
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <Nav/>

                <h4 id="table">Histórico de Solicitações</h4>
                <Table  buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/solicitacoes'}
                        descricao=  {'Descrição'}
                        status=     {'Estado'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}

                        descricaoL=  {'descricao'}
                        statusL=     {'status'}
                        dataL=       {'data'}
                        nomeL=       {'nome'    }

                         />                   
            </div>
        )
    }
}

