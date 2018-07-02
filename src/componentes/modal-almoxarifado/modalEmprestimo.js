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

                        <div id={this.props.divNum}>
                            <Label> Quantidade: </Label><br />
                            <NumericInput type="number" min={1} max={this.props.max} value={this.props.value} onChange={this.props.func} />
                        </div>
                        <br />
                        <div >
                            <Label> Localidade: </Label><br />
                            <Input placeholder='Informe o destino do produto' type="text" value={this.props.valueText} onChange={this.props.funcText} />
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