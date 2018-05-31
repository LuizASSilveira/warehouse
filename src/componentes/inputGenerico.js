import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup,Col,Label,Row,FormControl } from 'reactstrap';

const inputGenerico = ({name, size ,label, onChange, placeholder, value, error,help,disabled=false, type="text"}) => {
  
  return (
    <FormGroup 
      controlId={name} 
    >
    <Row style={ {marginRight: 0,}}>
      <Col sm={3} >
        <Label for={name}  >{label}</Label>
      </Col>
      <Col sm={6}>
        <FormControl 
          type={type}
          name={name}
          disabled={disabled}
          id={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <FormControl.Feedback />
      

      </Col>
    </Row>  
    </FormGroup>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  size: PropTypes.number,
  help: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default TextInput;
