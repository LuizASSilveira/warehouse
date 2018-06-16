import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table/tableHistorico';
import '../componentes/css/input.css'

export default class Criar extends Component {     
    constructor(){
        super()
        this.state={isAdm: false}
    }


    componentDidMount(){
        let adm
        adm = localStorage.getItem('isAdm')
        console.log(adm)
        if(adm === "false"){
            this.setState({ isAdm: false })
        }else{
            this.setState({ isAdm: true })
        }
    }
    render(){
        return(
            <div>
                <Nav isadm = {this.state.isAdm} />

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

