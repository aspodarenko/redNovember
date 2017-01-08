import styles from './main.scss';
import Menu from '../menu/menu.js';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
var ReactRedux = require("react-redux");

var React = require('react');
var ReactDOM = require('react-dom');

class Main extends React.Component {
   render () {
           return (
                <div>
                        {(this.props.game == undefined || this.props.game.started == false) &&
                        <div>
                            <Menu/>
                            <div className={styles.boxImage}>
                                <div><img src="img/background.jpg"/></div>
                            </div>
                        </div>
                        }
                        {(this.props.game != undefined && this.props.game.started == true) &&
                        <div className={styles.table}>
                            <div><img src="img/table.jpg"/></div>
                        </div>

                }
                </div>
            );
   }
}

var mapStateToProps = function(state){
    if(state.currentGame != undefined) {
        return {
            game: state.currentGame.game
        };
    } else {
        return {}
    }
};

var mapDispatchToProps = function(dispatch){

    return {

    }
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Main);