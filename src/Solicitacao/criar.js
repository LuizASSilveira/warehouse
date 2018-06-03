import React, { Component } from 'react';
import Nav      from '../componentes/navbarAdm';
import InputG   from '../componentes/inputGenerico'
import '../componentes/css/input.css'
import NumericInput,{valueAsNumber,getValueAsNumber} from 'react-numeric-input';
export default class CriarS extends Component {     
    constructor(){
        super()
        this.state = { decricao: '', justificativa:'', quantidade:''}
        this.handleChangeDes = this.handleChangeDes.bind(this);
        this.handleChangeJus = this.handleChangeJus.bind(this);

    }
    handleChangeDes(event) {
        this.setState({ decricao: event.target.value });
    }
    
    handleChangeJus(event) {
        this.setState({ justificativa: event.target.value });
    }

    handleChangeQtd(event) {
        console.log(getValueAsNumber(valueAsNumber))
        
    }
    
    render(){
        return(
            <div>
                <Nav isadm = {false} />
                <div id = "Inputs">
                    <NumericInput 
                        type=           "number"
                        min=            {1} 
                        max=            {1000} 
                        value=          {1}
                        onChange=       {this.handleChangeQtd()}
                    />
                    <InputG 
                        label=          {'Descrição'}
                        name=           {'descrição'}
                        placeholder=    {'Descrição'}
                        type=           {'text'}   
                        id=             {'inputDesc'}
                        value=          {this.state.value} 
                        onChange=       {this.handleChangeDes}
                    />                    
                    <InputG 
                        label=          {'Justificativa'}
                        name=           {'justificativa'}
                        placeholder=    {'Justificativa'}
                        type=           {'text'}   
                        id=             {'inputJus'}
                        value=          {this.state.value} 
                        onChange=       {this.handleChangeJus}
                    />
                </div>
            </div>
        )
    }
}

