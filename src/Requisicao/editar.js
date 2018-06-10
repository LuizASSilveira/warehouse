import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';

export default class Criar extends Component {     
    render(){

        return(
            <div>
                <Nav    isadm = {true} />
                <TableEditar  buttonName= {'Salvar'}
                        urlGet=     {'https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json' + this.props.match.params.id}
                        descricao=  {'Descrição'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}

                        descricaoL=  {'descricao'}
                        dataL=       {'data'}
                        nomeL=       {'nome'}
                />                   
            </div>
        )
    }
}

