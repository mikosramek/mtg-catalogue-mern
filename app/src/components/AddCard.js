import React from 'react';
import axios from 'axios';

const AddCard = props => {

  const URL_BASE = 'https://mtg-catalogue-mern.herokuapp.com';

  const [cardName, setCardName] = React.useState('');

  const searchForCard = (e) => {
    e.preventDefault();
    console.log(cardName);
    addCard({name:"john",
      image_url:"heeeee",
      color_identity:"WUB",
      cmc:0,
      type:"small child",
      owned:1,
      used:1,
      oracle:"he is a dumbass"});
  }
  
  const addCard = cardData => {
    console.log(cardData);
    axios.put('http://localhost:3001/_4364dxx/cards/add', cardData)
      .then( (result) => {
        console.log(result);
      }).catch( (error) => {
        console.log(error);
      });
  }

  return(
    <form onSubmit={searchForCard}>
      <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} />
      <button>Add Card</button>
    </form>
  )
}

export default AddCard;