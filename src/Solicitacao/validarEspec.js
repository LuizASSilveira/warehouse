import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import { Input, Button, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback } from 'reactstrap';
import TableSiorg from "../componentes/table/siorgTable";
import NumericInput from 'react-numeric-input';
import { Link } from 'react-router-dom'
import Orcamento from './orcamento'


export default class validEspec extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      products: [],
      index: 0,
      feed: false,
      loading: true,
      linha: [],
      apertou: false
    }
    this.toggle = this.toggle.bind(this);
    this.properFunc = this.properFunc.bind(this);
    this.onChange = this.onChange.bind(this);
    this.quandoClica = this.quandoClica.bind(this);
    this.guardaRow = this.guardaRow.bind(this);
    this.mandaSiorg = this.mandaSiorg.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    fetch("http://localhost:3001/solicitacoes/" + this.props.match.params.id, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product, loading: false });
      });

  }
  properFunc(row, isSelected, e) {
    console.log(row)
    this.setState({
      selected: row
    });
    this.toggle()
  }

  setselect = (e) => {
    let x = this.state.selected
    x.status = e.target.value
    this.setState({ selected: x })
  }

  guardaRow(row, isSelected) {
    this.setState({
      linha: isSelected ? row : { siorg: null, decricao: null }
    });
  }

    handleChangeQtd(valor) {
        let products = this.state.products
        this.state.products[this.state.index].quantidade=  valor 
        this.setState({ products: products}); 
    }

  onChange(ev) {
    let products = this.state.products
    products[this.state.index][ev.target.name] = ev.target.value
    this.setState({ products: products })
  }

  quandoClica() {
    if (this.state.products[this.state.index].descricao !== 0 && this.state.products[this.state.index].justificativa !== 0) {
      const requestInfo = {
        method: 'PUT',
        body: JSON.stringify({ descricao: this.state.products[this.state.index].descricao, 
                               justificativa: this.state.products[this.state.index].justificativa, 
                               quantidade: this.state.products[this.state.index].quantidade,
                               siorg: this.state.products[this.state.index].siorg,
                               feedback: this.state.products[this.state.index].feedback,
                               status: this.state.products[this.state.index].status}),
        headers: new Headers({
          'Content-type': 'application/json',
          'token': localStorage.getItem('auth-token')
        })

      };

      fetch('http://localhost:3001/solicitacoes/'+this.props.match.params.id, requestInfo)
        .then(response => {
          if (response.ok) {
            //alerta dados salvos com sucesso
            console.log("tudo ok")
            this.props.history.push('/solicitacao/validar');
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

  mandaSiorg() {
    let products = this.state.products
    if (this.state.linha.siorg) {
      products[this.state.index].siorg = this.state.linha.siorg
      products[this.state.index].descricao = this.state.linha.descricao
    }

    this.setState({
      products: products,
    })
    this.toggle()
  }


  render() {
    
    console.log(this.state.products[0])
    // const selectRowProp = {
    //   mode: 'radio',
    //   hideSelectColumn: true,
    //   clickToSelect: true,
    //   onSelect: this.properFunc
    // }
    if (!this.state.loading) {

      return (
        <div>
          <Nav/>
          <div id="Inputs">
          <h4>Validar Solicitação</h4>
            
            <FormGroup>
            <br/>
              <Label>Solicitação Status:</Label>
              {console.log(this.state.products[0].status)}
              <Input id='optInput' type="select" name="status"  value={this.state.products[this.state.index].status} onChange={this.onChange}>
                <option>ABERTO</option>
                <option>APROVADO</option>
                <option>CANCELADO</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label> Siorg</Label><br/>
              <div id='InputButtonSiorg'>
                <Input placeholder="Nº Siorg" name='siorg' value={this.state.products[this.state.index].siorg} type='text' id='inputSiorg' disabled='true' />
                <Button id="buttonSiorg" color="secondary" onClick={this.toggle}>Lista Siorg</Button>
              </div><br/><br/>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                <ModalHeader toggle={this.toggle}>Lista Siorg</ModalHeader>
                <ModalBody>
                  <TableSiorg a={this.guardaRow} urlGet={'http://localhost:3001/produtos'} />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.mandaSiorg}>Confirmar</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                </ModalFooter>
              </Modal>
            </FormGroup>

            <FormGroup>
              <Label> Descrição</Label>
              <Input type="textarea" 
                    disabled={this.state.products[this.state.index].siorg ? true : false}
                    invalid={!this.state.products[this.state.index].descricao}
                    feedback={'anything'} name={'descricao'} onChange={this.onChange} 
                    value={this.state.products[this.state.index].descricao} />
              <FormFeedback>Preencha este campo!</FormFeedback>
            </FormGroup>
            
            <FormGroup>
                <Label>Quantidade</Label>
                <br/>
                <NumericInput min={1}max={1000}  value={this.state.products[this.state.index].quantidade} strict={true} onChange={this.handleChangeQtd.bind(this)} />
            </FormGroup>

            <FormGroup>
                <Label>Justificativa </Label>
                <Input  type={'textarea'} name={'justificativa'} onChange={this.onChange} 
                        invalid={!this.state.products[this.state.index].justificativa}
                        value={this.state.products[this.state.index].justificativa} />
                <FormFeedback>Preencha este campo!</FormFeedback>
            </FormGroup>

            
            
            <FormGroup>
                <Label>Feedback</Label>
                <Input type='textarea' name='feedback' value={this.state.products[this.state.index].feedback} onChange={this.onChange} placeholder='Insira um comentário para o solicitante sobre o motivo da aprovação ou cancelamento da solicitação.' />
                <FormFeedback>Preencha este campo!</FormFeedback>
            </FormGroup>

            <Orcamento isValidar={true} dado={this.props.match.params.id} urlGet={'http://localhost:3001/orcamentos/'+ this.props.match.params.id} />
            
            <div class="right">
                <Button id="confirm" color="primary" 
                        onClick={this.quandoClica}>Confirmar</Button>
                <Link to="/solicitacao/validar">
                    <Button id="cancel" color="danger" >Cancelar</Button>
                </Link>
            </div>
          </div>
        </div>
      )
    }
    else {
      return ("Carregando")
    }
  }
}