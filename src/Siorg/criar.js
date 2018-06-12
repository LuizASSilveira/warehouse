import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import { Button, Label, FormGroup, Input } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta'
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom'
export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', siorg: '' , alerta: false, vai: false}
        this.onChange = this.onChange.bind(this);
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
        console.log(this.state.decricao)
    }

    onChange(ev) {
    let numsiorg = this.state.siorg
       numsiorg = ev.target.value
       this.setState({ siorg: numsiorg })
    }

    salvar(){
        if(this.state.decricao.length !== 0 && this.state.siorg.length !== 0){
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({descricao: this.state.decricao  ,siorg: this.state.siorg}),
                headers: new Headers({
                  'Content-type': 'application/json',
                  'token': localStorage.getItem('auth-token')
                })
              };
              fetch("http://localhost:3001/produtos", requestInfo)
                .then(response => {
                  if (response.ok) {
                    //alerta dados salvos com sucesso
                    console.log("tudo ok")
                    this.setState({vai:true});
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
                <h4>Criar Produto Siorg</h4>
                    
                    <FormGroup>
                        <Label> Número do Siorg </Label>
                        <Input placeholder="Número Siorg" type="number" name="siorg" value={this.state.siorg} onChange={this.onChange} />
                    </FormGroup>


                    <InputG label={'Descrição:'} name={'descrição'} placeholder={'Descrição'} type={'textarea'} id={'inputDesc'} value={this.state.value} onChange={this.handleChangeDes.bind(this)}/>                    
                    <Link to="/siorg/lista"> 
                    <Button id="buttonPost" color="danger" onClick={this.salvar.bind(this)}> Salvar </Button>
                    </Link>
                    
                    
                </div>
            </div>
        )
    }
}

