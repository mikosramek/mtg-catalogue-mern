import React from 'react';

const Card = props => {
  const { name } = props.card;
  return(
    <li>
      <h2>{name}</h2>
    </li>
  )
}

export default Card;