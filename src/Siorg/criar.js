import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import { Button } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta'
export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', siorg:'', alerta: false}
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
        console.log(this.state.decricao)
    }
    handleChangeSio(event) {
        this.setState({ siorg: event.target.value  });
    }

    salvar(){
        if(this.state.decricao.length !== 0 && this.state.justificativa.length !== 0){
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({descricao: this.state.decricao  ,justificativa: this.state.justificativa, quantidade: this.state.quantidade}),
                headers: new Headers({
                  'Content-type': 'application/json',
                  'token': localStorage.getItem('auth-token')
                })
              };
              fetch(this.props.urlPost, requestInfo)
                .then(response => {
                  if (response.ok) {
                    //alerta dados salvos com sucesso
                    console.log("tudo ok")
                  } else {
                    throw new Error("não foi possivel salvar as alterações");
                  }
                })
        }
        else{
            this.setState({ alerta: true })
        }
    }
    render(){
        return(
            <div>
                <Nav isadm = {false} />
                <ErrorAlert isOpen={this.state.alerta} id="errorAlert" color="danger" text='Preencha todos os campos'/>
                <div id = "Inputs">
                    
                    <InputG label={'Siorg:'} name={'siorg'} placeholder={' Nº Siorg'} type={'text'} id={'inputSiorg'} value={this.state.value}/>                       
                    <InputG label={'Descrição:'} name={'descrição'} placeholder={'Descrição'} type={'text'} id={'inputDesc'} value={this.state.value} onChange={this.handleChangeDes.bind(this)}/>                    
                    <Button id="buttonPost" color="danger" onClick={this.salvar.bind(this)}> Salvar </Button>
                    
                </div>
            </div>
        )
    }
}

