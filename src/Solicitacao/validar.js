import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import NumericInput from 'react-numeric-input';
import { Button,Label } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta'
import SolicitacoesTable from '../componentes/table/solicitacoes';
import ValidaSolTable from '../componentes/table/validSolTable';

export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', justificativa:'', quantidade: 1, siorg:'', alerta: false}
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
        console.log(this.state.decricao)
    }
    handleChangeJus(event) {
        this.setState({ justificativa: event.target.value });
    }
    handleChangeQtd(valor) {
        this.setState({ quantidade: valor });
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

                <ValidaSolTable urlGet={'https://gist.githubusercontent.com/caionakai/14335e0f3b7523e9bd52524deda7a4eb/raw/312a8f63eef178f581510093e12fe8d34d9d07b4/sol.json'}/>

                
            </div>
        )
    }
}

