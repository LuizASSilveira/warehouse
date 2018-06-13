import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';
import NumericInput from 'react-numeric-input';

class ModalAmoxarifado extends React.Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggleCancel} className={this.props.className}>
                    <ModalHeader toggle={this.toggleCancel}></ModalHeader>
                    <ModalBody>
                        <div>
                            <Label> {this.props.label}: </Label><br />
                            <NumericInput min={1} max={1000} value={this.props.value} onChange={this.props.setQuantidade} />
                        </div>
                        <Label check>
                            <Input type="checkbox"  defaultChecked={this.props.check} onChange={this.props.onChange} />{' '}
                            id unico
                        </Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"   onClick={this.props.onConfirm}>Confirmar </Button>
                        <Button color="secondary" onClick={this.props.onCancel}> Cancelar  </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalAmoxarifado;