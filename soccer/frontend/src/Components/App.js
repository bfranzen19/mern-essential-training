import React from "react";
import axios from "axios";
import PlayerList from "./Player/PlayerList";
import PlayerSingle from "./Player/PlayerSingle";
import PlayerForm from "./Player/PlayerForm";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            currentPlayer: {},
        };

        this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
    }

    componentDidMount() {
        const url = "http://localhost:4000/players";

        axios
            .get(url)
            .then((response) => {
                this.setState({
                    players: response.data,
                });
            })
            .catch((error) => {
                console.error("ERROR: ", error.message);
            });
    }

    updateCurrentPlayer(item) {
        this.setState({
            currentPlayer: item,
        });
    }

    render() {
        return (
            /* prettier-ignore */
            <div className="container-fluid">
                <div className="row">
                    <nav>
                        <div className="nav-wrapper light-blue darken-2">
                            <a href="/" className="brand-logo">Soccer Management</a>
                        </div>
                    </nav>
                </div>
                <div className="row">
                    <PlayerList 
                        players={this.state.players} 
                        updateCurrentPlayer={this.updateCurrentPlayer}
                    />
                    <div className="col s9"> 
                        <PlayerSingle player={this.state.currentPlayer}/> 
                    </div>
                </div>
                <div className="row">
                    <div className="col s12"> <PlayerForm/> </div>
                </div>
            </div>
        );
    }
}
export default App;
