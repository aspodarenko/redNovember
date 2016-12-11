import 'whatwg-fetch'

import styles from './menu.scss';

import MenuList from '../menuList/menuList.js';
import NewGameForm from '../newGameForm/newGameForm.js';
import StartGameForm from '../startGameForm/startGameForm.js';
import { newGame } from '../../actions/actions.js'

var React = require('react');
var ReactRedux = require("react-redux");
var ptypes = React.PropTypes;

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableGames : [],
            playerName : '',
            serverUrl : 'http://localhost:8080',
            isWrongPlayerName : false,
            selectedGameId : undefined,
            currentGame : undefined
        };
        // This binding is necessary to make `this` work in the callback
        this.updateCurrentGame = ptypes.string.isRequired,
        this.newGameClick = this.newGameClick.bind(this);
        this.joinGameClick = this.joinGameClick.bind(this);
        this.playerNameChangeHandler = this.playerNameChangeHandler.bind(this);
        this.selectedGameChange = this.selectedGameChange.bind(this);
        this.startGameClick = this.startGameClick.bind(this);
        this.leftGameClick = this.leftGameClick.bind(this);
    }


    componentDidMount() {
        fetch(this.state.serverUrl + '/games')
            .then((response) => {
                if (response.status !== 200) {
                    console.log('Game server not available' + response.status);
                    return;
                }
                return response.json()
            })
            .then((games) => {
                this.setState({
                    availableGames: games
                });
            });
    }


    newGameClick(event) {
        event.preventDefault();
        if(this.state.playerName.length == 0){
            this.state.isWrongPlayerName = true;
            return;
        } else {
            this.state.isWrongPlayerName = false;
        }
        fetch('/newGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : this.state.playerName,
                players : [{name: this.state.playerName }]
            })
        }).then((response) => {
            if (response.status !== 200) {
                console.log('Game server not available' + response.status);
                return;
            }
            return response.json()
        }).then((game) => {
            this.props.updateCurrentGame(game);
            });
    }

    playerNameChangeHandler(event){
        this.setState({
            playerName : event.target.value
        });
    }

    selectedGameChange(gameId){
        this.setState({
            selectedGameId : gameId
        });
    }

    joinGameClick(event) {
        event.preventDefault();
        fetch('/joinGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerName : this.state.playerName,
                gameId : this.state.selectedGameId
            })
        }).then((response) => {
            if (response.status !== 200) {
                console.log('Game server not available' + response.status);
                return;
            }
            return response.json()
        }).then((game) => {
            this.props.updateCurrentGame(game);
        });
    }

    startGameClick(event) {

    }

    leftGameClick(event) {

    }

    render() {
        return (
        <div className={styles.menu}>
            {this.props.currentGame.id == undefined &&
            <div>
                <div className={styles.list}>
                    <span>Available games</span>
                    <MenuList list={this.state.availableGames}
                              selectItem={this.selectedGameChange}
                              selectedItemId={this.state.selectedGameId}/>
                </div>
                < NewGameForm newGame={this.newGameClick}
                    joinGame={this.joinGameClick}
                    playerNameChangeHandler={this.playerNameChangeHandler}
                    isWrongPlayerName={this.state.isWrongPlayerName}
                    selectedGameId={this.state.selectedGameId}/>
            </div>
            }
            {this.props.currentGame.id != undefined &&
            <div>
                <div className={styles.list}>
                    <span>Player list</span>
                    <MenuList list={this.props.currentGame.players} selectItem={()=>{}}/>
                </div>
                <StartGameForm startGame={this.startGameClick} leftGame={this.leftGameClick}/>
            </div>
            }
        </div>
        );
    }
};


var mapStateToProps = function(state){
    return {
        currentGame: state.currentGame
    };
};

var mapDispatchToProps = function(dispatch){
    return {
        updateCurrentGame: function(game){
            console.log('eee');
            dispatch(newGame(game)); },
    }
};


export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Menu);
