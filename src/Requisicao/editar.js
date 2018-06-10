import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';

export default class Criar extends Component {     
    render(){

        console.log(this.props.match.params.id)
        return(
            <div>
                <Nav    isadm = {true} />
                <TableEditar  buttonName= {'Salvar'}
                        urlGet=     {'http://localhost:3001/requisicoes/' + this.props.match.params.id}
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

