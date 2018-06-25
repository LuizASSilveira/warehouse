import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Table} from '../componentes/table/addSolicitacaoReq';
import {TableEditar} from '../componentes/table/tableEditarRequisicao';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


export default class Criar extends Component {     
    constructor(props){
        super(props)
        this.state = {
            modal: false,
            selected: []
        }

        this.toggle = this.toggle.bind(this);
        this.guardaRow = this.guardaRow.bind(this);
        this.funcConfirm = this.funcConfirm.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    guardaRow(row, isSelected){
        if (isSelected) {
            this.setState({selected: this.state.selected.concat(row.id)})
        } 
        else {
          const index = this.state.selected.indexOf(row.id);
          if(index < 0) return
          this.state.selected.splice(index, 1)
          this.setState({selected: this.state.selected})  
        }
    }

    funcConfirm() {
        const requestInfo = {
          method: 'POST',
          body: JSON.stringify({solicitacoes: this.state.selected}),
          headers: new Headers({
            'Content-type': 'application/json',
            'token': localStorage.getItem('auth-token')
          })
        };
        fetch('http://localhost:3001/requisicoes/'+this.props.match.params.id+'/solicitacoes', requestInfo)
          .then(response => {
            if (response.ok) {
              //alerta dados salvos com sucesso
            } else {
              throw new Error("não foi possivel salvar as alterações");
            }
          })
        this.toggle()  
    }

    render(){
        return(
            <div>
                <Nav/>
                <h4 id="table">Editar Requisição</h4>
                <TableEditar  buttonName= {'Salvar'}

                        urlGet=     {'http://localhost:3001/requisicoes/' + this.props.match.params.id}
                        urlDelete = {'http://localhost:3001/requisicoes/excluir/solicitacao/'}

                        urlGet2=    {'http://localhost:3001/requisicoes/numero/' + this.props.match.params.id}
                        urlPut2=    {'http://localhost:3001/requisicoes/' + this.props.match.params.id }                    

                        descricao=  {'Descrição'}
                        data=       {'Data'}
                        nome=       {'Solicitante'}
                        orcamento=  {'Orçamento'}

                        descricaoL= {'descricao'}
                        dataL=      {'data'}
                        nomeL=      {'nome'}
                        orcamentoL= {'orcamento'}
                />

                <Button onClick={this.toggle}> Adicionar Solicitação </Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                    <ModalHeader toggle={this.toggle}>Adicionar Solicitação</ModalHeader>
                    
                    <ModalBody>
                        <Table  
                            funcao = {this.guardaRow}
                            history = {this.props.history}
                            buttonName= {'Criar Requisição'}
                            urlGet=     {'http://localhost:3001/solicitacoes/requisicao'}
                            urlPost=    {'http://localhost:3001/requisicoes'}
                            descricao=  {'Descrição'}
                            status=     {'Estado'}
                            data=       {'Data'}
                            nome=       {'Solicitante'}

                            descricaoL=  {'descricao'}
                            statusL=     {'status'}
                            dataL=       {'data'}
                            nomeL=       {'nome'}
                        /> 
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.funcConfirm}>Confirmar</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>                
            </div>
        )
    }
}

