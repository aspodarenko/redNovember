import styles from './startGameForm.scss';
import commonStyles from '../common/common.scss';
var classNames = require('classnames/bind');
var cxCommon = classNames.bind(commonStyles);
var React = require('react');

class StartGameForm extends React.Component {
    render() {
        let startGameBtnClasses = cxCommon({
                btnDisable :  !this.props.canStart,
                btn : true
            }
        );
        return (
            <form>
                <div>
                    <input type="button" className={startGameBtnClasses} onClick={this.props.startGame} value="Start Game"/>
                    <input type="button" className={commonStyles.btn} onClick={this.props.leftGame} value="Left Game"/>
                </div>
            </form>
        );
    }
};

export default StartGameForm;