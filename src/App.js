import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Feed from './containers/Feed';
import { ThemeProvider } from 'styled-components';
import reducers from './reducers/reducers';
import './App.css';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const theme = {

};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Header />
            <Feed />
          </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;