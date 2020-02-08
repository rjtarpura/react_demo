import React from 'react';
import './card-list.styles.css';
import Card from '../card/card.component'

const CardList = (props)=>{
    console.log("Card List Draw",props);
    return (
        <div className="card-list">
            {
                props.monsters.map((monster,id)=>{
                    return <Card key={id} monster={monster}></Card>
                })
            }
        </div>
    );
}

export default CardList;