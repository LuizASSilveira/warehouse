import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table/tableHistorico';

export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav isadm = {true} />
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

