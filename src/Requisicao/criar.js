import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table';
import '../componentes/css/input.css'

export default class Criar extends Component {     
    render(){
       
        return(
            <div>
                <Nav    isadm = {true} />
                <h4 id="table">Criar Requisição</h4>

                <Table  buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/solicitacoes/requisicao'}
                        urlPost=    {'http://localhost:3001/requisicoes'}
                        descricao=  {'Descrição'}
                        status=     {'Estado'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}

                        descricaoL=  {'descricao'}
                        statusL=     {'status'}
                        dataL=       {'data'}
                        nomeL=       {'nome'}
                />                   
            </div>
        )
    }
}

