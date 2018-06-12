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
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  requisicao = () =>{
    if (this.props.isadm){

    return(<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Requisições
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink href="/requisicao/criar">Criar Requisição</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/requisicao/historico">Visualizar Requisição</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>)
    }
    return ("")
  }

  render() {
    let validar, addSiorg
    if(this.props.isadm){
      validar =   <DropdownItem>
                    <NavLink href="/solicitacao/validar">Validar Solicitação</NavLink>
                  </DropdownItem>
      addSiorg =  <DropdownItem>
                    <NavLink href="/siorg/criar">Adicionar Siorg</NavLink>
                  </DropdownItem>
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Almoxarifado UTFPR</NavbarBrand>
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
                    <NavLink href="/solicitacao/historico">Visualizar Solicitação</NavLink>
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
              
              </Nav>

              <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href="/components/"> 
                    <FontAwesome
                      className="super-crazy-colors"
                      name="user"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                    Perfil
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/components/"> 
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
