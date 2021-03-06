import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import '../css/modal.css'

class ModalAmoxarifado extends React.Component {
    constructor(){
        super()
        this.state = { array:[]}
    }
        render() {
        return (
            <div >
                <Modal isOpen={this.props.modal} toggle={this.props.onCancel} className={this.props.className}>
                    <ModalHeader toggle={this.props.onCancel}>Almoxarifado</ModalHeader>
                    <ModalBody>
                        {this.props.mensagem}

                        <div id={this.props.divID}>
                            <Label> {this.props.Fornecedor}: </Label><br />
                            <Input type="select" value={this.props.valor} onChange={this.props.orcamentoID}>
                                {this.props.array.map((forn) =>
                                <option key={forn.id} >{forn.nome_fornecedor}</option>
                                )}
                            </Input>
                        </div>
                        <div id={this.props.divNum}>
                            <Label> {this.props.label}: </Label><br />
                            <NumericInput type="number" min={1} max={this.props.max} value={this.props.value} onChange={this.props.func} />
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
                        <Button color="danger" onClick={this.props.onCancel}>    Cancelar  </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default ModalAmoxarifado;