import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.toggleCancel = this.toggleCancel.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount(){
    this.setState({
      modal: this.props.toggle
    });
  }

  toggleConfirm() {
    this.setState({
      modal: !this.state.modal
    
    });
    this.props.onConfirm()
  }

  toggleCancel() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.onCancel()
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.toggleCancel} className={this.props.className} >
          <ModalHeader toggle={this.toggleCancel}> {this.props.header}</ModalHeader>
          <ModalBody>
            {this.props.mensagem}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleConfirm}>Confirmar</Button>{' '}
            <Button color="danger" onClick={this.toggleCancel}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Confirm;