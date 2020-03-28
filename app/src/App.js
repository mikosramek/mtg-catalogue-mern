import React from 'react';

import './styles/style.scss';

import SearchBar from './components/SearchBar';
import AddCard from './components/AddCard';
import CardList from './components/CardList';

const App = props => {

  const [cards, setCards] = React.useState([]);

  return(
    <>
      <header>
        <div className="wrapper">
          <h1>Miko's Card Catalogue</h1>
          <SearchBar setCards={setCards} />
          <AddCard />
        </div>
      </header>
      <main>
        <div className="wrapper">
          <h2>Current Cards:</h2>
          <CardList cards={cards} />
        </div>
      </main>
    </>
  )
}

export default App;