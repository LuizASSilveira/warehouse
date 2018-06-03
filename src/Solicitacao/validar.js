import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import NumericInput from 'react-numeric-input';
import { Button,Label } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta'
import SolicitacoesTable from '../componentes/table/solicitacoes';
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
                <div id = "Inputs">
                    <div id='siorgButton'>
                        <InputG label={'Siorg:'} name={'siorg'} placeholder={' Nº Siorg'} type={'text'} id={'inputSiorg'} disabled={true} value={this.state.value}/>
                        <Button id="buttonSiorg" color="danger" onClick={this.salvar.bind(this)}> Lista Siorg </Button>      
                    </div>    

                    <Label> Quantidade: </Label><br />
                    <NumericInput min={1}max={1000} name={'qtd'} value={this.state.quantidade} onChange={this.handleChangeQtd.bind(this)}/>
                    <InputG label={'Descrição:'} name={'descrição'} placeholder={'Descrição'} type={'text'} id={'inputDesc'} value={this.state.value} onChange={this.handleChangeDes.bind(this)}/>                    
                    <InputG label={'Justificativa:'} name={'justificativa'} placeholder={'Justificativa'} type={'text'} id={'inputJus'} value={this.state.value} onChange={this.handleChangeJus.bind(this)}
                    />
                    <Button id="buttonPost" color="danger" onClick={this.salvar.bind(this)}> Salvar </Button>
                    
                </div>
                <SolicitacoesTable  urlGet={'https://gist.githubusercontent.com/caionakai/14335e0f3b7523e9bd52524deda7a4eb/raw/5cac43a94ef1e6160c6b25a9e463a5d1067c3502/sol.json'}/>
            </div>
        )
    }
}

