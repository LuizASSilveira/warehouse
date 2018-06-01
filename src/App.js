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
import ProdutosTable from "./componentes/table/produtos";

var data = [
  {
    siorg: 1,
    nome: "Arduino",
    descricao: "Placa Eletrônica Arduino",
    categoria: "Placa Eletrônica",
    condicao: "Novo"
  },
  {
    siorg: 1,
    nome: "Arduino",
    descricao: "Placa Eletrônica Arduino",
    categoria: "Placa Eletrônica",
    condicao: "Novo"
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProdutosTable data={data} />
      </div>
    );
  }
}

export default App;
