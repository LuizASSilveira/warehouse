import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';

export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav/>
                <h4 id="table">Editar Requisição</h4>
                <TableEditar  buttonName= {'Salvar'}

                        urlGet=     {'http://localhost:3001/requisicoes/' + this.props.match.params.id}
                        urlDelete = {'http://localhost:3001/requisicoes/excluir/solicitacao/'}

                        urlGet2=    {'http://localhost:3001/requisicoes/numero/' + this.props.match.params.id}
                        urlPut2=    {'http://localhost:3001/requisicoes/' + this.props.match.params.id }                    

                        descricao=  {'Descrição'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}
                        orcamento=  {'Orçamento'}

                        descricaoL= {'descricao'}
                        dataL=      {'data'}
                        nomeL=      {'nome'}
                        orcamentoL= {'orcamento'}
                />                   
            </div>
        )
    }
}

