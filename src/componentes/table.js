import React, { Component } from 'react';
import './css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../node_modules/react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Modal from '../componentes/confirmModal';
import { Button, Input, FormGroup, FormFeedback, ModalBody, ModalFooter } from 'reactstrap';
import './css/input.css'
import ExpandTable from './table/expand'
class Table extends Component {

  constructor(props) {
    super(props)
    this.state = { products: [], modal: false, name:'',selected:[], validNome: false, alerta: false}
    this.toggle = this.toggle.bind(this)
    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.onRowSelect = this.onRowSelect.bind(this);
  }

  funcConfirm() {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({nome: this.state.name ,solicitacoes: this.state.selected}),
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    };
    fetch(this.props.urlPost, requestInfo)
      .then(response => {
        if (response.ok) {
          //alerta dados salvos com sucesso
          this.props.history.push('/requisicao/historico');
        } else {
          throw new Error("não foi possivel salvar as alterações");
        }
      })
    this.funcCancel()  
}

  funcCancel() {
    this.setState({modal:false})
  }

  onRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({selected: this.state.selected.concat(row.id)})
      this.props.func(false)
      this.setState({alerta: false})
    } else {
      const index = this.state.selected.indexOf(row.id);
      if(index < 0) return
      this.state.selected.splice(index, 1)
      this.setState({selected: this.state.selected})
      
    }
  }
  
  toggle() {
    if(this.state.name.length !== 0 && this.state.selected.length !== 0){
      this.setState({modal:true, alerta: false})
    }else{
      if(this.state.name.length === 0){
        this.setState({validNome: true});
      }
      if (this.state.selected.length === 0) {
        this.setState({alerta: true})
        this.props.func(true)
      }
    }
  }


  componentDidMount() {
    fetch(this.props.urlGet, {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'token': localStorage.getItem('auth-token')
      })
    })
      .then(response => response.json())
      .then(product => {
        this.setState({ products: product })
      })
  }
  
  handleChange(event) {
    this.setState({ name: event.target.value, validNome: false });
  }

  onRowClick(row){
    this.setState({ id: row.id})
    this.setState({ redirect: true })

  }

  expandComponent(row) {
    return (      
      <ExpandTable data={ row } siorg={false} />
    );
  }

  isExpandableRow() {
    return true;
  }

  render() {
    
    if (this.state.redirect) {
        this.props.history.push('/solicitacao/validar/'+this.state.id);
    }

    const options ={
      noDataText: 'Não há dados.',
      onRowDoubleClick: this.onRowClick
        
    }

    var selectRowProp = {
      clickToSelect: true,
      mode: 'checkbox',
      bgColor:'#98FB98',
      
      onSelect: this.onRowSelect,
    };

    return (
      <div>
      <div id="table">
        <BootstrapTable
          data={this.state.products}
          selectRow={selectRowProp}
          search={true}
          pagination
          hover={true}
          expandComponent={ this.expandComponent }
          expandableRow={ this.isExpandableRow }
          searchPlaceholder='Pesquisar'
          options={options}
        >
          <TableHeaderColumn dataField='id' isKey>  ID                                              </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField={this.props.dataL} dataAlign='center'>      {this.props.data}       </TableHeaderColumn>
          <TableHeaderColumn width='60%' dataField={this.props.descricaoL} dataAlign='center'> {this.props.descricao}  </TableHeaderColumn>
          <TableHeaderColumn width='10%' dataField={this.props.statusL} dataAlign='center'>    {this.props.status}     </TableHeaderColumn>
          <TableHeaderColumn width='20%' dataField={this.props.nomeL} dataAlign='center'>      {this.props.nome}       </TableHeaderColumn>
        </BootstrapTable>

        <div id="InputButton">
          <FormGroup>
            <div>
              <Input invalid={this.state.validNome} placeholder="Nome Requisição" id="nome" type="text" name="nome" value={this.state.value} onChange={this.handleChange} />
                      <Button id="criaReq"color="primary" onClick={this.toggle}>{this.props.buttonName}</Button>
              <FormFeedback>Preencha este campo!</FormFeedback>

            </div>

          </FormGroup>

        </div>

        <Modal header="Requisição" modal={this.state.modal} onCancel={this.funcCancel} onConfirm={this.funcConfirm} toggle={true} mensagem={'Deseja confirmar?'} />

        <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
          <ModalBody>  Deseja Confirmar?    </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.funcConfirm}>Confirmar</Button>{' '}
              <Button color="danger" onClick={this.funcCancel}>Cancelar</Button>
          </ModalFooter>
        </Modal>       
      </div>
      </div>
    );
  }
}
export { Table }