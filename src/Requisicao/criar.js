import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table';
import '../componentes/css/input.css'
import {ErrorAlert} from '../componentes/alerta.js'

export default class Criar extends Component {     
    constructor(props){
        super(props)
        this.state = {controlaAlert: false}
        this.controlAlert=this.controlAlert.bind(this)
    }

    controlAlert(boleano){
        this.setState({controlaAlert: boleano})
    }

    render(){
       
        return(
            <div>
                <Nav/>
                <ErrorAlert isOpen={this.state.controlaAlert} id="errorAlert" color="danger" text='Nenhuma solicitação selecionada!'/>
                <h4 id="table">Criar Requisição</h4>

                <Table  
                        func = {this.controlAlert}
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

