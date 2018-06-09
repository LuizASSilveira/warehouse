import React, {Component} from 'react';
import {FormGroup,Label, Input, FormFeedback, FormText} from 'reactstrap';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';


export default class InputG extends Component { 
 constructor(props) {
    super(props);

    this.state = {
      ...this.props
    };
  }


  render(){


  return (
    <div>
    <FormGroup controlId={this.state.name} >
          <Label for={this.state.name}>{this.state.label}</Label>
          <Input  disabled={this.state.disabled} ref={this.state.ref} className={this.state.classname} valid={this.state.valid} invalid={this.state.invalid} name={this.state.name} placeholder={this.state.placeholder} type={this.state.type} onChange={this.state.onChange} value={this.state.value} id={this.state.id}/>
          <FormFeedback valid={this.state.valid}>{this.state.feedback}</FormFeedback>
          <FormText>{this.state.formtext}</FormText>
    </FormGroup>

    </div>
  );
  }


}
InputG.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    classname: PropTypes.string,
    formtext: PropTypes.string,
    feedback:PropTypes.string,
    disabled:PropTypes.bool,
    label:PropTypes.string,
    valid:PropTypes.bool,
    invalid:PropTypes.bool,
    onChange:PropTypes.func,
    ref:PropTypes.any,
    placeholder:PropTypes.string, 
    value:PropTypes.any, 
    error:PropTypes.any,
    help:PropTypes.any,
    type:PropTypes.any,
    inline:PropTypes.bool,
    mensagem:PropTypes.string
};