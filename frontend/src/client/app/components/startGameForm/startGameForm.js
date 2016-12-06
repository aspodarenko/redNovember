import styles from './startGameForm.scss';
import commonStyles from '../common/common.scss';
var React = require('react');

class StartGameForm extends React.Component {
    render() {
        return (
            <form>
                <div>
                    <input type="button" className={commonStyles.btn} onClick={this.props.startGame} value="Start Game"/>
                    <input type="button" className={commonStyles.btn} onClick={this.props.leftGame} value="Left Game"/>
                </div>
            </form>
        );
    }
};

export default StartGameForm;