import React from 'react';

export default function Die(props) {

    const green = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <div className="die" style={green} onClick={props.holddice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}