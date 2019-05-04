import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './styles.css';
import Terminal from './components/Terminal';
import terminalApp from './reducers/reducers';

const store = createStore(terminalApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Terminal />
            </Provider>
        );
    }
}

export default App;
