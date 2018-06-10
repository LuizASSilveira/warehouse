import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';

export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav    isadm = {true} />
                <TableEditar  buttonName= {'Salvar'}

                        urlGet=     {'http://localhost:3001/requisicoes/' + this.props.match.params.id}
                        urlDelete = {'http://localhost:3001/requisicoes/excluir/solicitacao/'}

                        urlGet2=    {'http://localhost:3001/requisicoes/numero/' + this.props.match.params.id}

                        urlPut2=    {'http://localhost:3001/requisicoes/' + this.props.match.params.id }                    

                        descricao=  {'Descrição'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}

                        descricaoL= {'descricao'}
                        dataL=      {'data'}
                        nomeL=      {'nome'}
                />                   
            </div>
        )
    }
}

