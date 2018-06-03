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
                      <NavLink href="https://github.com/reactstrap/reactstrap">Criar Requisição</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">Visualizar Requisição</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>)
    }
    return ("")
  }

  render() {

    return (
      <div>
        <Navbar color="dark"  expand="md">
          <NavbarBrand href="/">warehouse</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="left" navbar>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Solicitações
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Criar Solicitação</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Visualizar Solicitação</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Validar Solicitação</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <this.requisicao />

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Siorg
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Adicionar Siorg</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">Consultar Siorg</NavLink>
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
