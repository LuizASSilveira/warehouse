import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import '../css/modal.css'

class ModalAmoxarifado extends React.Component {
    constructor(){
        super()
        this.state = {array:[]}
    }

    // componentDidMount() {
    //     fetch("http://localhost:3001/orcamentos/3", {
    //       method: 'GET',
    //       headers: new Headers({
    //         'Content-type': 'application/json',
    //         'token': localStorage.getItem('auth-token')
    //       })
    //     }).then(response => response.json())
    //       .then(product => {
    //         this.setState({ array: product });
            
    //       })
    //   }
    
    render() {
        return (
            <div >
                <Modal isOpen={this.props.modal} toggle={this.props.onCancel} className={this.props.className}>
                    <ModalHeader toggle={this.props.onCancel}>Almoxarifado</ModalHeader>
                    <ModalBody>
                        {this.props.mensagem}

                        <div id={this.props.divID}>
                            <Label> {this.props.Fornecedor}: </Label><br />
                            <Input type="select">
                                {this.state.array.map((forn) =>
                                <option key={forn.nome_fornecedor} >{forn.nome_fornecedor}</option>
                                )}
                            </Input>
                        </div>
                        <div id={this.props.divNum}>
                            <Label> {this.props.label}: </Label><br />
                            <NumericInput type="number" min={1} max={this.props.max} value={this.props.value} onChange={this.props.setQuantidade} />
                        </div>
                        <div id={this.props.divID}>
                            <Label check id="checkModal">
                                <Input type="checkbox" defaultChecked={this.props.check} onChange={this.props.onChange} />{' '}
                                Produto Publico
                            </Label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.onConfirm}>     Confirmar </Button>
                        <Button color="secondary" onClick={this.props.onCancel}>    Cancelar  </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalAmoxarifado;