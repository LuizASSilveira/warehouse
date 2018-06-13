import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import NumericInput from 'react-numeric-input';
import {Input, Button,Label ,FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {ErrorAlert} from '../componentes/alerta';
import TableSiorg from "../componentes/table/siorgTable";
import { Link } from 'react-router-dom'

export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { 
            decricao: '', justificativa:'', quantidade: 1, siorg:'', alerta: false,
            isAdm: false,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.mandaSiorg = this.mandaSiorg.bind(this);
        this.guardaRow = this.guardaRow.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
    }
    handleChangeJus(event) {
        this.setState({ justificativa: event.target.value });
    }
    handleChangeQtd(valor) {
        this.setState({ quantidade: valor }); 
    }
    handleChangeSio(event) {
        this.setState({ siorg: event.target.value });
    }
    
    mandaSiorg(){
    if(this.state.linha.siorg){
        this.setState({
          decricao: this.state.linha.descricao,
          siorg: this.state.linha.siorg,
          value: this.state.linha.siorg
        })
    }
    this.toggle()
     }

    guardaRow(row, isSelected){
        this.setState({
          linha: isSelected?row:{siorg:null,decricao:null}
        });
    }

    componentDidMount(){
        let adm
        adm = localStorage.getItem('isAdm')
        console.log(adm)
        if(adm === "false"){
            this.setState({ isAdm: false })
        }else{
            this.setState({ isAdm: true })
        }
    }

    salvar(){
        if(this.state.decricao.length !== 0 && this.state.justificativa.length !== 0){
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({descricao: this.state.decricao  ,justificativa: this.state.justificativa, quantidade: this.state.quantidade, siorg: this.state.siorg}),
                headers: new Headers({
                  'Content-type': 'application/json',
                  'token': localStorage.getItem('auth-token'),
                    
                })
              };

              fetch('http://localhost:3001/solicitacoes', requestInfo)
                .then(response => {
                  if (response.ok) {
                    //alerta dados salvos com sucesso
                    window.location.reload()
                    console.log("tudo ok")
                    this.props.history.push('/solicitacao/historico');
                  } else {
                      console.log(response)
                    throw new Error(response);
                  }
                })
        }
        else {
            this.setState({ alerta: true })
        }
    }
    render(){
        return(
            <div>
                <Nav isadm={this.state.isAdm} />
                <ErrorAlert isOpen={this.state.alerta} id="errorAlert" color="danger" text='Preencha todos os campos'/>
                <div id = "Inputs">
                    <h4>Criar Solicitação</h4>
                    <div id='siorgButton'>
                    <FormGroup>
                        <Label>Siorg</Label>
                        <br / >
                        <Input name='siorg' placeholder='Nº Siorg' type='text' id='inputSiorg' disabled='true' value={this.state.value}/>
                        <Button id="buttonSiorg" color="secondary" onClick={this.toggle}>Lista Siorg</Button> 
                    </FormGroup>
                    </div>     
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                          <ModalHeader toggle={this.toggle}>Lista Siorg</ModalHeader>
                          <ModalBody>
                             <TableSiorg a={this.guardaRow} urlGet={'http://localhost:3001/produtos'}/>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.mandaSiorg}>Confirmar</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                          </ModalFooter>
                        </Modal>

                    <Label> Quantidade </Label><br />
                    <NumericInput min={1} max={1000} name={'qtd'} value={this.state.quantidade} strict={true} onChange={this.handleChangeQtd.bind(this)} />

                    <FormGroup>
                        <Label> Descrição</Label>
                        <Input placeholder="Descrição" disabled={this.state.value? true: false} type={'textarea'} feedback={'anything'} name={'descricao'} onChange={this.handleChangeDes.bind(this)} value={this.state.decricao} />
                    </FormGroup>                  
                    <InputG label={'Justificativa'} name={'justificativa'} placeholder={'Justificativa'} type={'textarea'} id={'inputJus'} value={this.state.value} onChange={this.handleChangeJus.bind(this)}/>
                    <Link to="/solicitacao/historico">
                        <Button  id="buttonPost" color="danger" >Cancelar</Button>
                    </Link>
                    <Button id="buttonPost" className="confirm" color="primary" onClick={this.salvar.bind(this)}> Salvar </Button>
                </div>
            </div>
        )
    }
}

