import React from "react";
import axios from "axios";

class PlayerForm extends React.Component {
    submitPlayer(event) {
        event.preventDefault();
        const url = 'http://localhost:4000/players';
        const payload = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            phone: this.refs.phone.value, 
            email: this.refs.email.value,
            strength: this.refs.strength.value,
            endurance: this.refs.endurance.value
        };

        axios.post(url, payload).then((response) => {
            console.log('response: ', response, '\ndata: ', response.data);
        }).catch((error) => {
            console.error('ERROR: ', error.message);
        });
    };

    render() {
        return (
            <div className="row">
                <h4 className="center">Add a new player</h4>
                <form className="col s12" onSubmit={this.submitPlayer.bind(this)}>
                      <div className="row">
                            <div className="input-field col s6">
                                <input id="firstName" ref="firstName" type="text"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="lastName" ref="lastName" type="text"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="phone" ref="phone" type="text"/>
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="email" ref="email" type="text"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="strength" ref="strength" type="text"/>
                                <label htmlFor="strength">Strength Rating</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="endurance" ref="endurance" type="text"/>
                                <label htmlFor="endurance">Endurance Rating</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Add Player</button>
                </form>
            </div>
        );
    };
};

export default PlayerForm;
