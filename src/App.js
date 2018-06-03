// import React, { Component } from 'react';

// class App extends Component {
//   render() {
//     return (

//       <div id="main">
//         {
//           this.props.children
//         }
//       </div>
//     )

//   }
// }

// export default App;

import React, { Component } from "react";
// import "./App.css";
import SolicitacoesTable from "./componentes/table/solicitacoes";

var data = [
  {
    siorg: 5,
    data: new Date(2018, 11, 24),
    descricao: "Placa Eletrônica Arduino",
    qtde: 1,
    status: "Em aberto"
  },
  {
    siorg: 1,
    data: new Date(2018, 11, 22),
    descricao: "APlaca Eletrônica Arduino",
    qtde: 5,
    status: "Comprado"
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <SolicitacoesTable data={data} />
      </div>
    );
  }
}

export default App;
