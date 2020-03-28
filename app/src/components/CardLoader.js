import React from 'react';
import backing from '../assets/backing.jpg'
const CardLoader = props => {
  return(
    <li className="__card loader">
      <img src={backing} alt=""/>
    </li>
  )
}

export default CardLoader;