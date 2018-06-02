import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
export default class CriarS extends Component {     
    render(){
       
        return(
            <div>
                <Nav    isadm = {false} />
                <div id = "Inputs">
                    <InputG 
                        label=          {'Descrição'}
                        name=           {'Descrição'}
                        placeholder=    {'Descrição'}
                        type=           {'text'}   
                        id=             {'inputDesc'}
                    />
                </div>
            </div>
        )
    }
}

