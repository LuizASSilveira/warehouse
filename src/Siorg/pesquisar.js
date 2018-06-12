import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {TableSiorg} from '../componentes/table/siorgTable';

export default class Criar extends Component {
    constructor(){
        super()
        this.state={isAdm:false}
    } 

    qualquerCoisa(){
        let a
    }

    componentDidMount(){
        let adm
        adm = localStorage.getItem('isAdm')
        console.log(adm)
        if(adm === false){
            this.setState({ isAdm: false })
        }
    }

    render(){
       
        return(
            <div>
                <Nav    isadm = {this.state.isAdm} />
                <h4>Tabela Siorg</h4>

                <TableSiorg  b={this.qualquerCoisa} buttonName= {'Criar Requisicao'}
                        urlGet=     {'http://localhost:3001/produtos'}
                        urlDelete= {'http://localhost:3001/produtos/'}
                        
                        descricao=  {'Descrição'}
                        siorg=      {'Siorg'}
                        

                        descricaoL=  {'descricao'}
                        siorgL=      {'siorg'}
                        
                />                   
            </div>
        )
    }
}

