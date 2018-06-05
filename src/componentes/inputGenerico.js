import React from 'react';
import {FormGroup,Label, Input, FormFeedback, FormText} from 'reactstrap';

const InputG = ({id, name, classname, formtext, feedback ,disabled=false, label, onChange, ref, placeholder, value, error,help, type}) => {
  
  return (
    <div>
    <FormGroup controlId={name} >
          <Label for={name}>{label}</Label>
          <Input  disabled={disabled} ref={ref} className={classname} name={name} placeholder={placeholder} type={type} onChange={onChange} value={value} id={id}/>
          <FormFeedback>{feedback}</FormFeedback>
          <FormText>{formtext}</FormText>
    </FormGroup>
    </div>
  );
};


export default InputG;
