import React from 'react';
import './card.styles.css';

const url = "https://robohash.org/";    //number_or_string?set=set2&size=180x180

const Card = (props)=>{
    // console.log('Card Draw',props);
    return (
        <div className="card-container">
            <img alt="monster.name" src={url+props.monster.id+"?set=set2&size=180x180"}/>
            <h2>{props.monster.name}</h2>
            <p>{props.monster.email}</p>
        </div>
    );
}

export default Card;