import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import NumericInput from 'react-numeric-input';
import { Input, Button, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap';
import TableSiorg from "../componentes/table/siorgTable";
import { Link } from 'react-router-dom'

export default class CriarS extends Component {
    constructor() {
        super()
        this.state = {
            decricao: '', justificativa: '', quantidade: 1, siorg: '', alerta: false,
            isAdm: false, validDesc: false, validJust: false,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.mandaSiorg = this.mandaSiorg.bind(this);
        this.guardaRow = this.guardaRow.bind(this);
        this.salvar = this.salvar.bind(this);
        this.mudaJust = this.mudaJust.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value, validDesc: false });
    }
    mudaJust(event) {
        let teste = event.target.value
        this.setState({ justificativa: teste, validJust: false });
    }
    handleChangeQtd(valor) {
        this.setState({ quantidade: valor });
    }
    handleChangeSio(event) {
        this.setState({ siorg: event.target.value });
    }

    mandaSiorg() {
        if (this.state.linha.siorg) {
            this.setState({
                decricao: this.state.linha.descricao,
                siorg: this.state.linha.siorg,
                value: this.state.linha.siorg,
                validDesc: false
            })
        }
        this.toggle()
    }

    guardaRow(row, isSelected) {
        this.setState({
            linha: isSelected ? row : { siorg: null, decricao: null }
        });
    }


    salvar() {
        if (this.state.decricao.length !== 0 && this.state.justificativa.length !== 0) {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({
                    descricao: this.state.decricao,
                    justificativa: this.state.justificativa,
                    quantidade: this.state.quantidade,
                    siorg: this.state.siorg
                }),
                headers: new Headers({
                    'Content-type': 'application/json',
                    'token': localStorage.getItem('auth-token'),

                })
            };

            fetch('http://localhost:3001/solicitacoes', requestInfo)
                .then(response => response.json().then(data => {
                    if (response.ok) {
                        console.log(data.id)
                        // window.location.reload()
                        this.props.history.push('/solicitacao/orcamento/' + data.id);
                    } else {
                        throw new Error(response);
                    }
                }))
        }
        else {
            // verifica se a descricao está vazia, se esta entao seta a variavel de validacao
            if (this.state.decricao.length === 0) {
                this.setState({ validDesc: true });
            }
            if (this.state.justificativa.length === 0) {
                this.setState({ validJust: true });
            }
        }
    }
    render() {
        return (
            <div>
                <Nav isadm={this.state.isAdm} />
                <div id="Inputs">
                    <h4 className="titulo">Criar Solicitação</h4>

                    <div id='siorgButton'>
                        <FormGroup>
                            <Label>Siorg</Label>
                            <br />
                            <div id='InputButtonSiorg'>
                                <Input name='siorg' placeholder='Nº Siorg' type='text'
                                    id='inputSiorg' disabled='true' value={this.state.value} />
                                <Button id="buttonSiorg" color="secondary" onClick={this.toggle}>
                                    Lista Siorg
                                </Button>
                            </div>
                            <br />
                            <br />

                        </FormGroup>
                    </div>

                    <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                        <ModalHeader toggle={this.toggle}>Lista Siorg</ModalHeader>

                        <ModalBody>
                            <TableSiorg esconde={true} a={this.guardaRow} urlGet={'http://localhost:3001/produtos'} />
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.mandaSiorg}>Confirmar</Button>{' '}
                            <Button color="danger" onClick={this.toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <FormGroup>
                        <Label> Quantidade </Label><br />
                        <NumericInput min={1} max={1000} name={'qtd'}
                            value={this.state.quantidade} strict={true}
                            onChange={this.handleChangeQtd.bind(this)} />
                    </FormGroup>

                    <FormGroup>
                        <Label> Descrição</Label>
                        <Input invalid={this.state.validDesc} placeholder="Descrição"
                            disabled={this.state.value ? true : false}
                            type={'textarea'} feedback={'anything'} name={'descricao'}
                            onChange={this.handleChangeDes.bind(this)} value={this.state.decricao} />
                        <FormFeedback>Preencha este campo!</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label>Justificativa</Label>
                        <Input invalid={this.state.validJust}
                            placeholder={'Justificativa'}
                            type={'textarea'} value={this.state.justificativa}
                            onChange={this.mudaJust} />
                        <FormFeedback>Preencha este campo!</FormFeedback>
                    </FormGroup>

                    <Link to="/solicitacao/historico">
                        <Button id="buttonPost" color="danger" >Cancelar</Button>
                    </Link>
                    <Button id="buttonPost" className="confirm" color="primary"
                        onClick={this.salvar.bind(this)}> Salvar </Button>
                </div>
            </div>
        )
    }
}

