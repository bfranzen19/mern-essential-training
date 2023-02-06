import React from "react";

const PlayerSingle = (props) => {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src="soccer.png" alt="soccer ball"/>
                        <span className="card-title cyan-text text-accent-4"
                        style={{ fontWeight: "bold" }}
                        >{props.player.firstName} {props.player.lastName}</span>
                    </div>
                    <div className="card-content">
                        <p>Phone: {props.player.phone}</p>
                        <p>Email: {props.player.email}</p>
                        <p>Strength: {props.player.strength}</p>
                        <p>Endurance: {props.player.endurance}</p>
                    </div>
                    <div className="card-action">
                        Team: {props.player.team}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerSingle;
