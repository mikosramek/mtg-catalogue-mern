import React from 'react';
import axios from 'axios';

import PossibleCard from './PossibleCard';

const AddCard = props => {

  const URL_BASE = 'https://mtg-catalogue-mern.herokuapp.com';

  const [cardName, setCardName] = React.useState('');
  
  const [possibleCards, setPossibleCards] = React.useState([]);

  const [gettingCard, setGettingCard] = React.useState(false);


  const handleError = (error) => {
    setGettingCard(false);
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

  React.useEffect(() => {
    if(cardName.length > 3){
      getCardSuggestions();
    } else {
      setPossibleCards([]);
    }
  }, [cardName])
  const getCardSuggestions = () => {
    axios({
      method: 'GET',
      url: `https://api.scryfall.com/cards/autocomplete?q=${cardName}`,
      dataResponse: 'json',
    }).then((response) => {
      setPossibleCards(response.data.data);
    }).catch(handleError);
  }


  const searchForCard = (card) => {
    setGettingCard(true);
    axios({
      method: 'GET',
      url: `https://api.scryfall.com/cards/named?exact=${card.name}`,
      dataResponse: 'json',
    }).then(data => pruneData(data, card)).catch(handleError);
  }

  const pruneData = (response, userCardData) => {
    const card = response.data;
    const newCard = {
      name:card.name,
      image_url:card.image_uris.normal,
      color_identity:orderColorArray(card.color_identity),
      cmc:card.cmc,
      type:card.type_line,
      owned:userCardData.owned,
      used:userCardData.used,
      oracle:card.oracle_text
    }
    addCard(newCard);
  }
  
  const addCard = cardData => {
    axios.put(`${URL_BASE}/_4364dxx/cards/add`, cardData)
      .then(() => {
        setCardName('');
        setPossibleCards([]);
        setGettingCard(false);
      }).catch((error) => {
        console.log(error);
      });
  }

  return(
    <form onSubmit={(e) => {e.preventDefault();}} className="add-card">
      <button onClick={props.hide} className="hide-form">x</button>
      <label htmlFor="cardName">Card Name:</label>
      <input 
        type="text" 
        id="cardName" 
        value={cardName} 
        onChange={e => setCardName(e.target.value)} 
        disabled={gettingCard}
      />
      <ul>
        {
          possibleCards.map((card, i) => {
            return <PossibleCard card={card} key={`suggestion-${i}`} submitCard={searchForCard} gettingCard={gettingCard} />
          })
        }
      </ul>
    </form>
  )
}

export default AddCard;