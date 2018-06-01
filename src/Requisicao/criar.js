import React, { Component } from 'react';
import Nav from '../componentes/navbarAdm';
import {Form}  from 'reactstrap';
import {Table} from '../componentes/table';
import InputG from '../componentes/inputGenerico';

export default class Criar extends Component {

    render(){
        return(
            <div>
                <Nav />
                <Table buttonName={'Criar Requisicao'} />
				<Form>
					<InputG classname={'valid'} label={'もしもし'} placeholder={'何だこれ'} type={'textarea'} formtext={'なるほど'}/>
					<InputG classname={'valid'} label={'もしもし'} placeholder={'何だこれ'} type={'number'} formtext={'なるほど'}/>
				</Form>
            </div>
        )
    }
}

