import React from 'react';
import axios from 'axios';

const AddCard = props => {

  const URL_BASE = 'https://mtg-catalogue-mern.herokuapp.com';

  const [cardName, setCardName] = React.useState('');

  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data.details);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
  }

  const orderColorArray = (arr) => {
    let identity = '';
    if(arr.includes('W')) { identity += 'W' }
    if(arr.includes('U')) { identity += 'U' }
    if(arr.includes('B')) { identity += 'B' }
    if(arr.includes('R')) { identity += 'R' }
    if(arr.includes('G')) { identity += 'G' }
    return identity;
  }

  const searchForCard = (e) => {
    e.preventDefault();
    axios({
      method: 'GET',
      url: `https://api.scryfall.com/cards/named?fuzzy=${cardName}`,
      dataResponse: 'json',
    }).then(pruneData).catch(handleError);
  }

  const pruneData = (response) => {
    const card = response.data;
    const newCard = {
      name:card.name,
      image_url:card.image_uris.normal,
      color_identity:orderColorArray(card.color_identity),
      cmc:card.cmc,
      type:card.type_line,
      owned:1,
      used:1,
      oracle:card.oracle_text
    }
    addCard(newCard);
  }
  
  const addCard = cardData => {
    axios.put(`${URL_BASE}/_4364dxx/cards/add`, cardData)
      .then(() => {
        setCardName('');
      }).catch((error) => {
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