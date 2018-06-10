import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import { Button, Label } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta'
import NumericInput from 'react-numeric-input';
export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', siorg: '' , alerta: false}
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
        console.log(this.state.decricao)
    }
    handleChangeSio(valor) {
        this.setState({ siorg: valor });
    }

    salvar(){
        if(this.state.decricao.length !== 0 && this.state.siorg.length !== 0){
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
                <Nav isadm = {true} />
                <ErrorAlert isOpen={this.state.alerta} id="errorAlert" color="danger" text='Preencha todos os campos'/>
                <div id = "Inputs">
                    
                    <Label> Quantidade: </Label><br />
                    <NumericInput placeholder= "Numero Siorg" min={1}max={10000} name={'nSiorg'} value={this.state.siorg} onChange={this.handleChangeSio.bind(this)} />
                    
                    <InputG label={'Descrição:'} name={'descrição'} placeholder={'Descrição'} type={'textarea'} id={'inputDesc'} value={this.state.value} onChange={this.handleChangeDes.bind(this)}/>                    
                    <Button id="buttonPost" color="danger" onClick={this.salvar.bind(this)}> Salvar </Button>
                    
                </div>
            </div>
        )
    }
}

