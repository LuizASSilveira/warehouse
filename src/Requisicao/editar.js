import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';

export default class Criar extends Component {     
    render(){
        return(
            <div>
                <Nav    isadm = {true} />
                <TableEditar  buttonName= {'Editar'}
                        urlGet=     {'https://raw.githubusercontent.com/LuizASSilveira/pi-almoxarifado/master/listSolicitacao.json'}
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

