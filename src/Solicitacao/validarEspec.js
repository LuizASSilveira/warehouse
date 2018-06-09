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
      feed: false,
      selected: { descricao: '', data: '', siorg: '', qtde: '', status: '' }
    }
    this.toggle = this.toggle.bind(this);
    this.properFunc = this.properFunc.bind(this);
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
        this.setState({ products: product });
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

  render() {
    let feed
    var dado = []
    if (this.state.products.length > 0) {
        dado[0]=this.state.products[0].descricao;
        dado[1]=this.state.products[0].status;
        dado[2]=this.state.products[0].justificativa;
        dado[3]=this.state.products[0].data;
    }
    console.log(this.state.products[0])
    if (this.state.selected.status === 'CANCELADA') {
      feed = <InputG label={'Feedback:'} type={'textarea'} placeholder={'Insira um comentário para o solicitante sobre o motivo do cancelamento da solicitação.'} />
    }
    const selectRowProp = {
      mode: 'radio',
      hideSelectColumn: true,
      clickToSelect: true,
      onSelect: this.properFunc
    }    
    return(
         <div>
           <Nav isadm = {true} />
           <h3>Validar Solicitação</h3>
           <div id = "Inputs">
                        <FormGroup>
                            <Label> Siorg</Label>
                             <div id='siorgButton'>
                                <Input label='Siorg:' name='siorg' type='text' id='inputSiorg' disabled='true' value={this.state.selected.siorg}/>
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
                    <InputG label={'Data'}   value={dado[3]} />
                    <InputG label={'Descrição'}  value={dado[0]} />
                    <InputG label={'Quantidade'} type={'number'} value={this.state.selected.quantidade} />
                    <InputG label={'Justificativa'} value={dado[2]} />
                    <FormGroup>
                    <Label>Status</Label>
                    <Input type="select" name="select" id="exampleSelect" value={this.state.selected.status} onChange={this.setselect}>
                        {this.loadSelect()}
                    </Input>
                    </FormGroup>
                    {feed}
                    <OrcamentosTable urlGet={"http://localhost:3001/solicitacoes/" + this.props.match.params.id +"/orcamentos"}/>
            </div>
        </div>
    )
  }
}