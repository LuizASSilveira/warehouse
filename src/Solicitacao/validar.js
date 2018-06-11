import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import {ErrorAlert} from '../componentes/alerta'
import ValidaSolTable from '../componentes/table/validSolTable';

export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { descricao: '', justificativa:'', quantidade: 1, siorg:'', alerta: false}
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
        console.log(this.state.descricao)
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
                body: JSON.stringify({descricao: this.state.descricao  ,justificativa: this.state.justificativa, quantidade: this.state.quantidade}),
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
                    throw new Error("Não foi possivel salvar as alterações");
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

                <ValidaSolTable urlGet={'http://localhost:3001/solicitacoes/validar'}/>
                
            </div>
        )
    }
}

