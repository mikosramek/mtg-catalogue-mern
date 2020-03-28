import React from 'react';
import axios from 'axios';

const SearchBar = props => {
  const { setCards } = props;
  React.useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://mtg-catalogue-mern.herokuapp.com/_4364dxx/cards/get',
      dataResponse: 'json',
    }).then( (result) => {
      setCards(result.data.cards);
    }).catch( (error) => {
      console.log(error);
    });
  }, [setCards])

  return(
    <form>
      <label htmlFor="cardName">Card Name:</label>
      <input type="text" id="cardName" />
    </form>
  )
}

export default SearchBar;