import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import Teste from '../componentes/confirmModal';
import {Button, Form}  from 'reactstrap';
import {Table} from '../componentes/table';
import InputG from '../componentes/inputGenerico';

export default class Criar extends Component {
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


    render(){
		let modal = ""

  		if(this.state.modal){
  		modal = <Teste onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'}/>

  		// this.toggle()
  		// setTimeout( this.toggle(), 100)
  		}


        return(
            <div>
                <Nav />
                <Table  />
                <Button color="danger" onClick={this.toggle}>Criar Requisição</Button>
				{modal}
				<Form>
					<InputG classname={'valid'} label={'もしもし'} placeholder={'何だこれ'} type={'textarea'} formtext={'なるほど'}/>
					<InputG classname={'valid'} label={'もしもし'} placeholder={'何だこれ'} type={'number'} formtext={'なるほど'}/>
				</Form>
            </div>
        )
        
    }
}

