import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table';
import '../componentes/css/input.css'

export default class Criar extends Component {     
    render(){
       
        return(
            <div>
                <Nav/>
                <h4 id="table">Criar Requisição</h4>

                <Table  
                        history = {this.props.history}
                        buttonName= {'Criar Requisição'}
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

