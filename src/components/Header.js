import React, { Component } from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  text-align: center;
  margin: 0 auto;
`;

export default class Header extends Component {
  render() {
    return (
      <Nav>
        <h1>Alexandrith Sharron - My Personal Musings</h1>
      </Nav>
    );
  }
}
