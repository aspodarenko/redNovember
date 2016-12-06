import styles from './main.scss';
import Menu from '../menu/menu.js';

var React = require('react');
var ReactDOM = require('react-dom');


var Main = React.createClass({
    render: function () {
        return (
            <div>
                <Menu/>
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