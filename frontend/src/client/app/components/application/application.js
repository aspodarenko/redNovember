import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../../reducers/reducers.js'
import { Provider } from 'react-redux'
import Main from '../main/main.js';

var React = require('react');
var ReactDOM = require('react-dom');

class Application extends React.Component {
   render () {

       const loggerMiddleware = createLogger()
       let store = createStore(
           rootReducer,
           applyMiddleware(
               thunkMiddleware, // lets us dispatch() functions
               loggerMiddleware // neat middleware that logs actions
           )
       );
           return (
                <div>
                    <Provider store={store}>
                        <Main/>
                    </Provider>
                </div>
            );
            }
       }

ReactDOM.render(
    <Application/>,
    document.getElementById('app')
);