import React, { Component } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import { ThemeProvider } from 'styled-components';
import './App.css';

const theme = {

};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Feed />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;