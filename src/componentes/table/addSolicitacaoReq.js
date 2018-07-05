import React, { Component } from 'react';
import '../css/table.css'
import { BootstrapTable, TableHeaderColumn } from '../../../node_modules/react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '../css/input.css'

class Table extends Component {

  constructor(props) {
    super(props)
    this.state = {
      products: [],
      selected: []
    }

    this.funcCancel = this.funcCancel.bind(this)
    this.funcConfirm = this.funcConfirm.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
  }

  funcConfirm() {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ nome: this.state.name, solicitacoes: this.state.selected }),
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
    this.setState({ modal: false })
  }

  onRowSelect(row, isSelected) {
    if (isSelected) {
      this.setState({ selected: this.state.selected.concat(row.id) })
      this.props.funcao(row, isSelected)
    }
    else {
      this.props.funcao(row, isSelected)
      const index = this.state.selected.indexOf(row.id);
      if (index < 0) return
      this.state.selected.splice(index, 1)
      this.setState({ selected: this.state.selected })
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
        this.setState({ products: product });
      });
  }

  onRowClick(row) {
    this.setState({ id: row.id })
    this.setState({ redirect: true })

  }


  render() {
    if (this.state.redirect) {
      this.props.history.push('/solicitacao/validar/' + this.state.id);
    }



    const options = {
      noDataText: 'Não há dados.',
      onRowDoubleClick: this.onRowClick

    }

    var selectRowProp = {
      clickToSelect: true,
      mode: 'checkbox',
      bgColor: '#98FB98',
      onSelect: this.onRowSelect
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
            searchPlaceholder='Pesquisar'
            options={options}
          >
            <TableHeaderColumn dataField='id' isKey>  ID                                 </TableHeaderColumn>
            <TableHeaderColumn width='20%' dataField={this.props.dataL} dataAlign='center'>      {this.props.data}       </TableHeaderColumn>
            <TableHeaderColumn width='60%' dataField={this.props.descricaoL} dataAlign='center'> {this.props.descricao}  </TableHeaderColumn>
            <TableHeaderColumn width='10%' dataField={this.props.statusL} dataAlign='center'>    {this.props.status}     </TableHeaderColumn>
            <TableHeaderColumn width='20%' dataField={this.props.nomeL} dataAlign='center'>      {this.props.nome}       </TableHeaderColumn>
          </BootstrapTable>

        </div>
      </div>
    );
  }
}
export { Table }