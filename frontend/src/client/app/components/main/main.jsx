import styles from './main.scss';
import Menu from '../menu/menu.js';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../../reducers/reducers.js'
import { Provider } from 'react-redux'

var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
    render: function () {

        const loggerMiddleware = createLogger()
        let store = createStore(
            rootReducer,
            applyMiddleware(
                thunkMiddleware, // lets us dispatch() functions
                loggerMiddleware // neat middleware that logs actions
            )
        )
        return (

            <div>
                <Provider store={store}>
                    <Menu/>
                </Provider>
                <div className={styles.boxImage}>
                    <div><img src="img/background.jpg"/></div>
                </div>
            </div>

        );
    }
});

ReactDOM.render(
    <Main/>,
    document.getElementById('app')
);