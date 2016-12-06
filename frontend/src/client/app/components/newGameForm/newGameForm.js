import styles from './newGameForm.scss';
import commonStyles from '../common/common.scss';
var React = require('react');
var classNames = require('classnames/bind');
var cx = classNames.bind(styles);
var cxCommon = classNames.bind(commonStyles);

class NewGameForm extends React.Component {
    render() {
        let playerNameClasses = cx({
            displayError : this.props.isWrongPlayerName,
            playerName : true
        });
        let joinGameBtnClasses = cxCommon({
                btnDisable :  this.props.selectedGameId == undefined,
                btn : true
            }
        );
        return (
            <form>
                <div className={playerNameClasses}>
                    <span className={styles.label}>Player name</span>
                    {this.props.isWrongPlayerName &&
                        <span className={styles.label}>Wrong player name</span>
                    }
                    <input className={styles.playerName} type="text" id="playerName" onChange={this.props.playerNameChangeHandler}/>
                </div>
                <div>
                    <input type="button" className={commonStyles.btn} onClick={this.props.newGame} value="New Game"/>
                    <input type="button" className={joinGameBtnClasses} onClick={this.props.joinGame} value="Join Game"/>
                </div>
            </form>
        );
    }
};

export default NewGameForm;


