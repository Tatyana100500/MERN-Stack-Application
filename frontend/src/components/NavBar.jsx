import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap';
import _ from 'lodash';
import styled from 'styled-components'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})``

class AppNavBar extends Component {
  render() {
    return (
      <Container>
        <Navbar className="mb-3 navbar navbar-expand-lg navbar-dark bg-dark">
          <Links />
        </Navbar>		
      </Container>
    )
  }
}

export default AppNavBar
