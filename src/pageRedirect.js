import React from 'react'
import { Redirect } from 'react-router-dom'
export default class Redirecionador extends React.Component {
  constructor(props){
    super(props)
    this.state={
      tempo: 5
    }

    this.acabouOTempo = this.acabouOTempo.bind(this);
  }

  componentDidMount(){
    this.acabouOTempo()
  }

  acabouOTempo(){
    this.setState({tempo: this.state.tempo-1})
     if(this.state.tempo > 0){
      setTimeout(this.acabouOTempo, 1000);
     }
  }

  render () {
    if(this.state.tempo <= 0){
      return <Redirect to='/'/>
    }
    return (
       <div style={{textAlign:'center', marginTop:'3%' }}>
        <h2 >Você não está logado!</h2>
        <h4>Redirecionando para login em {this.state.tempo}...</h4>
       </div>   
    )
  }
}