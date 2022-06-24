import React, { Component, useContext, createContext, useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

const AuthProvider = ({ children }) => {
	const authContext = createContext({});
	const userToken = localStorage.getItem('token');
    console.log(userToken)
	const [loggedIn, setLoggedIn] = useState(!!userToken);
    console.log(localStorage)
	const logIn = ({ token, username }) => {
	  localStorage.setItem('token', token);
	  localStorage.setItem('username', username);
	  setLoggedIn(true);
	};
	const logOut = () => {
	  localStorage.removeItem('token');
	  localStorage.removeItem('username');
	  setLoggedIn(false);
	};
  
	return (
	  <authContext.Provider value={{ loggedIn, logIn, logOut }}>
		{children}
	  </authContext.Provider>
	);
  };
const AuthSection = () => {
	const authContext = createContext({});
	const auth = useContext(authContext);
  
	const renderSection = () => {
	  if (auth.loggedIn) {
		return (
		  <>
			<Navbar.Text>Добрый день!</Navbar.Text>
			<Nav.Link onClick={auth.logOut}>Выйти</Nav.Link>
		  </>
		);
	  }
  
	  return <Nav.Link as={Link} to="/login">Войти</Nav.Link>;
	};
  
	return (
	  <Navbar.Collapse>
		{renderSection()}
	  </Navbar.Collapse>
	);
  };
class AppNavBar extends Component {
    render() {
        return (
            <Container>
				<AuthProvider>
                <Navbar className="mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
                    <Links />
                </Navbar>
				</AuthProvider>
            </Container>
        )
    }
}

export default AppNavBar
