import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

var FontAwesome = require('react-fontawesome')

export default class navbarAdm extends React.Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      admin: false
    };
  }

  componentDidMount(){
        let adm
        adm = localStorage.getItem('isAdm')
        console.log(adm)
        if(adm === "false"){
            this.setState({ admin: false })
        }else{
            this.setState({ admin: true })
        }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  requisicao = () =>{
    if (this.state.admin){

    return(<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Requisições
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/requisicao/criar">Criar Requisição</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/requisicao/historico">Visualizar Requisições</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>)
    }
    return ("")
  }

  render() {
    let validar, addSiorg, compras, devolver, informa,usuarioValida
    if(this.state.admin){
      validar =   <DropdownItem>
                    <NavLink href="/solicitacao/validar">Validar Solicitações</NavLink>
                  </DropdownItem>
      addSiorg =  <DropdownItem>
                    <NavLink href="/siorg/criar">Adicionar Siorg</NavLink>
                  </DropdownItem>
      compras =                   <DropdownItem>
                    <NavLink href="/almoxarifado/compras">Compras</NavLink>
                  </DropdownItem>

      devolver =                   <DropdownItem>
                    <NavLink href="/almoxarifado/devolucao">Devolução</NavLink>
                  </DropdownItem>

      informa =   <DropdownItem>
                    <NavLink href="/almoxarifado/info">Informações</NavLink>
                  </DropdownItem>            
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/solicitacao/historico">Almoxarifado UTFPR</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="left" navbar>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Solicitações
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/solicitacao/criar">Criar Solicitação</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/solicitacao/historico">Visualizar Solicitações</NavLink>
                  </DropdownItem>
                  {validar}
                </DropdownMenu>
              </UncontrolledDropdown>

              <this.requisicao />

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Siorg
                </DropdownToggle>
                <DropdownMenu right>
                  {addSiorg}
                  <DropdownItem>
                    <NavLink href="/siorg/lista">Consultar Siorg</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Produtos
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/almoxarifado/emprestimo">Emprestar</NavLink>
                  </DropdownItem>
                  {compras}
                  {devolver}
                  <DropdownItem>
                    <NavLink href="/almoxarifado/historico">Histórico</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/almoxarifado/unico">Unico</NavLink>
                  </DropdownItem>
                  {/* <DropdownItem>
                    <NavLink href="/almoxarifado/composto">Composto</NavLink>
                  </DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Usuarios
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/usuario/validacao">Validar Acesso</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              
            </Nav>

              <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink > 
                    <FontAwesome
                      className="super-crazy-colors"
                      name="user"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    {localStorage.getItem('nome')}
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/"> 
                    <FontAwesome
                      className="super-crazy-colors"
                      name="sign-out"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    Sair
                </NavLink>
              </NavItem>

              </Nav>

          </Collapse>
        </Navbar>
      </div>
    );
  }
}
