import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import { Button, Label, FormGroup, Input , FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom'
export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', siorg: '' , alerta: false, validDesc: false, validSiorg: false}
        this.onChange = this.onChange.bind(this);
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value, validDesc: false});
    }

    onChange(ev) {
    let numsiorg = this.state.siorg
       numsiorg = ev.target.value
       this.setState({ siorg: numsiorg, validSiorg: false})
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
                    this.props.history.push('/siorg/lista');
                    // this.setState({ siorg: '', value: ''})
                    // alert("Novo SIORG criado com sucesso!")

                  } else {
                    throw new Error("não foi possivel salvar as alterações");
                  }
                })
        }
        else{
            if(this.state.decricao.length === 0){
                this.setState({validDesc: true});
            }
            if(this.state.siorg.length === 0){
                this.setState({validSiorg: true});
            }
        }
    }
    render(){
        
        return(
            <div>
                <Nav/>
                
                <div id = "Inputs">
                <h4 className="titulo">Criar Produto Siorg</h4>
                    
                    <FormGroup>
                        <Label> Nº Siorg </Label>
                        <Input invalid={this.state.validSiorg} placeholder="Número Siorg" type="number" 
                               name="siorg" value={this.state.siorg} onChange={this.onChange} />
                        <FormFeedback>Preencha este campo!</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label> Descrição </Label>
                        <Input invalid={this.state.validDesc} placeholder="Descrição" type = "textarea" 
                               name="descrição" id="inputDesc" value={this.state.value}
                               onChange={this.handleChangeDes.bind(this)}/>
                        <FormFeedback>Preencha este campo!</FormFeedback>
                    </FormGroup>                   
                    <Link to="/siorg/lista">
                        <Button  id="buttonPost" color="danger" >Cancelar</Button>
                    </Link>
                    <Button id="buttonPost" color="primary" onClick={this.salvar.bind(this)}> Salvar </Button>
                    
                </div>
            </div>
        )
    }
}

