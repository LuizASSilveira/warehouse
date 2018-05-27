import React, { Component } from 'react';
import NavbarQ from './componentes/navbar';
import Login from './componentes/login';
import Teste from './componentes/confirmModal';
import {Button}  from 'reactstrap';

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle= this.toggle.bind(this)
    this.funcCancel= this.funcCancel.bind(this)
    this.funcConfirm= this.funcConfirm.bind(this)
  }

  funcConfirm(){
	this.toggle()
  }

  funcCancel(){
  	this.toggle()
  }
  toggle(){
  	this.setState({
  		modal: !this.state.modal
  	})
  }


  render() {

  	let modal = ""

  	if(this.state.modal){
  		modal = <Teste onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'}/>
  		// this.toggle()
  		// setTimeout( this.toggle(), 100)
  	}

    return (
     <div>

        <NavbarQ />
        <Login/>
        <Button color="danger" onClick={this.toggle}>Criar Requisição</Button>
		

		{modal}
        
      </div>
    )

  }
}

export default App;
