import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import { Container, Row, Col } from "reactstrap";
import ConfirmModal from "../confirmModal";

class OrcamentosTable extends Component {
  createCustomModalHeader(onClose, onSave) {
    const headerStyle = {
      fontWeight: "bold",
      fontSize: "large",
      textAlign: "center",
      backgroundColor: "#eeeeee"
    };
    return (
      <div className="modal-header" style={headerStyle}>
        <h3>Adicionar Orçamento</h3>
      </div>
    );
  }

  render() {
    const options = {
      insertModalHeader: this.createCustomModalHeader
    };
    return (
      <div>
        <br />
        <Container>
          <Row>
            <Col sm="4" md={{ size: 8, offset: 4 }}>
              <h2 className="Table-header">Orçamentos</h2>
            </Col>
          </Row>
          <br />
          <BootstrapTable
            data={this.props.data}
            search
            pagination
            insertRow
            deleteRow
            multiColumnSearch
            options={options}
          >
            <TableHeaderColumn isKey dataField="cnpj">
              CNPJ
            </TableHeaderColumn>
            <TableHeaderColumn dataField="fornecedor">
              Fornecedor
            </TableHeaderColumn>
            <TableHeaderColumn dataField="valor">Valor R$</TableHeaderColumn>
            <TableHeaderColumn dataField="ref">Referência</TableHeaderColumn>
            <TableHeaderColumn dataField="arquivo">Arquivo</TableHeaderColumn>
          </BootstrapTable>
        </Container>
      </div>
    );
  }
}

export default OrcamentosTable;
