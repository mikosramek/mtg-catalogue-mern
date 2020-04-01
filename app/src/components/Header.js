import React from 'react';

import SearchBar from './SearchBar';
import AddCard from './AddCard';

const Header = props => {

  const [showAddCard, setShowAddCard] = React.useState(false);

  return(
    <header>
      <div className="wrapper">
        <h1>Miko's Card Catalogue</h1>
        <SearchBar setCards={props.setCards} setLoading={props.setLoading} />

        <button onClick={() => setShowAddCard(!showAddCard)}>{showAddCard ? '-' : '+'}</button>

        { 
          showAddCard
            ? <AddCard hide={() => {setShowAddCard(false)}} />
            : null
        }
      </div>
    </header>
  )
}

export default Header;