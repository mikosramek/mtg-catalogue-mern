import React from 'react';
import axios from 'axios';

const SearchBar = props => {
  const { setCards, setLoading } = props;

  const [name, setName] = React.useState('');
  const [nameExact, setNameExact] = React.useState(false);

  const URL_BASE = 'https://mtg-catalogue-mern.herokuapp.com';
  const queryAPI = () => {
    setLoading(true);
    return axios({
      method: 'GET',
      url: `${URL_BASE}/_4364dxx/cards/get`,
      dataResponse: 'json',
      params: {
        name: name ? (nameExact ? 'e' : 's') + name : ''
      }
    });
  }

  const searchForCard = () => {
    queryAPI()
    .then((result) => {
      setLoading(false);
      setCards(result.data.cards);
    }).catch((error) => {
      console.log(error);
    });
  }

  React.useEffect(searchForCard, []);
  
  const submitSearch = (e) => {
    e.preventDefault();
    searchForCard();
  }


  return(
    <form onSubmit={submitSearch}>
      <label htmlFor="cardName">Card Name:</label>
      <input type="text" id="cardName" value={name} onChange={e => setName(e.target.value)} />
      <label htmlFor="exactName">Exact:</label>
      <input type="checkbox" name="exactName" id="exactName" checked={nameExact} onChange={() => setNameExact(!nameExact)} />
    </form>
  )
}

export default SearchBar;