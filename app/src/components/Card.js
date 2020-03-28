import React from 'react';

const Card = props => {
  const { image_url } = props.card;
  return(
    <li className="__card">
      <img src={image_url} alt="" />

    </li>
  )
}

export default Card;