import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import '../componentes/css/input.css'
import {  Input, Button, Label, FormGroup,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import InputG from "../componentes/inputGenerico";
import OrcamentosTable from "../componentes/table/orcamentos";
import TableSiorg from "../componentes/table/siorgTable";


export default class validEspec extends Component { 
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      products: [],
      index:0,
      feed: false,
      loading: true
    }
    this.toggle = this.toggle.bind(this);
    this.properFunc = this.properFunc.bind(this);
    this.onChange = this.onChange.bind(this);
    this.quandoClica = this.quandoClica.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

componentDidMount() {
    fetch("http://localhost:3001/solicitacoes/"+this.props.match.params.id, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product,
                        loading: false });
      });
  }
  properFunc(row, isSelected, e) {
    console.log(row)
    this.setState({
      selected: row
    });
    this.toggle()
  }
  loadSelect() {
    let status = ['ABERTA', 'REQUISITADA', 'COMPRADA', 'DESERTO', 'CANCELADA']
    console.log(this.state)
    return status.map((stat) => {
      return <option>{stat}</option>
    })
  }

  setselect = (e) => {
    let x = this.state.selected
    x.status = e.target.value
    this.setState({ selected: x })
  }
  onChange(ev){
    let products = this.state.products
    products[this.state.index][ev.target.name]=ev.target.value
    this.setState({products: products})
  }

  quandoClica(){
        if(this.state.decricao.length !== 0 && this.state.justificativa.length !== 0){
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({descricao: this.state.decricao  ,justificativa: this.state.justificativa, quantidade: this.state.quantidade}),
                headers: new Headers({
                  'Content-type': 'application/json',
                  'token': localStorage.getItem('auth-token')
                })
              };
              fetch('http://localhost:3001/solicitacoes', requestInfo)
                .then(response => {
                  if (response.ok) {
                    //alerta dados salvos com sucesso
                    console.log("tudo ok")
                  } else {
                      console.log(response)
                    throw new Error(response);
                  }
                })
        }
        else{
            this.setState({ alerta: true })
        }
  }


  render() {
    let feed

    console.log(this.state.products[0])
    const selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
      onSelect: this.properFunc
    }    
    if(!this.state.loading){
        if (this.state.products[this.state.index].status === 'CANCELADA') {
          feed = <InputG label={'Feedback:'} type={'textarea'} placeholder={'Insira um comentário para o solicitante sobre o motivo do cancelamento da solicitação.'} />
        }

    return(
         <div>
           <Nav isadm = {true} />
           <h3>Validar Solicitação</h3>
           <div id = "Inputs">
                        <FormGroup>
                            <Label> Siorg</Label>
                             <div id='siorgButton'>
                                <Input label='Siorg:' name='siorg' type='text' id='inputSiorg' disabled='true' />
                                <Button id="buttonSiorg" color="secondary" onClick={this.toggle}>Lista Siorg</Button> 
                            </div>    
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                          <ModalHeader toggle={this.toggle}>Lista Siorg</ModalHeader>
                          <ModalBody>
                             <TableSiorg urlGet={'https://gist.githubusercontent.com/caionakai/1ee2b50876f4ac8fe689b89f35580851/raw/c7909049b0603707ad77c7bc0ea65c857014ca72/siorg.json'}/>
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" onClick={this.toggle}>Confirmar</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                          </ModalFooter>
                        </Modal>
                        </FormGroup>
                    <InputG label={'Data'}  onChange={this.onChange} name={'data'} value={this.state.products[this.state.index].data} />
                    <InputG label={'Descrição'} valid={true} feedback={'anything'} name={'descricao'} onChange={this.onChange} value={this.state.products[this.state.index].descricao} />
                    <InputG label={'Quantidade'}  type={'number'} name={'quantidade'}  />
                    <InputG label={'Justificativa'} name={'justificativa'} onChange={this.onChange} value={this.state.products[this.state.index].justificativa} />
                    <FormGroup>
                    <Label>Status</Label>
                    <Input type="select" name="status" id="exampleSelect" value={this.state.products[this.state.index].status} onChange={this.onChange}>
                        {this.loadSelect()}
                    </Input>
                    </FormGroup>
                    {feed}
                    <OrcamentosTable urlGet={"http://localhost:3001/solicitacoes/" + this.props.match.params.id +"/orcamentos"}/>
            </div>
            <Button onClick={this.quandoClica}>Confirmar</Button>
            <Button>Cancelar</Button>
        </div>
    )
    }
    else{
        return ("loading")
    }
  }
}