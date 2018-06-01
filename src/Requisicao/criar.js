import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table';


export default class Criar extends Component {     
    render(){
       
        return(
            <div>
                <Nav />
                <Table buttonName={'Criar Requisicao'} />                   
            </div>
        )
    }
}

