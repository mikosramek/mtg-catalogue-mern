import React from 'react';

import Card from './Card';

const CardList = props => {
  const { cards } = props;
  console.log(cards);
  return(
    <ul>
      {
        cards.map(card => {
          return <Card card={card} key={`card${card.id}`} />
        })
      }
    </ul>
  )
}

export default CardList;