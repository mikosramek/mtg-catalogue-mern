import React from 'react';

import Card from './Card';
import CardLoader from './CardLoader';

const CardList = props => {
  const { cards, loading } = props;


  return(
    <ul className="card-list">
      {
        loading 
        ? [...new Array(8)].map((e, i) => {
          return <CardLoader key={i} />
         })
        : cards.map(card => {
            return <Card card={card} key={`card${card.id}`} />
          })
      }
    </ul>
  )
}

export default CardList;