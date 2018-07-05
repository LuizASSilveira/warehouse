import React, { Component } from "react";
import { Alert } from "reactstrap";

class ErrorAlert extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <Alert isOpen={this.props.isOpen} color={this.props.color}>
          {this.props.text}
        </Alert>
      </div>
    );
  }
}
export { ErrorAlert };
