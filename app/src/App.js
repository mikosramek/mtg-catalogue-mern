import React from 'react';

import './styles/style.scss';

import SearchBar from './components/SearchBar';
import AddCard from './components/AddCard';
import CardList from './components/CardList';

const App = props => {

  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  return(
    <>
      <header>
        <div className="wrapper">
          <h1>Miko's Card Catalogue</h1>
          <SearchBar setCards={setCards} setLoading={setLoading} />
          <AddCard />
        </div>
      </header>
      <main>
        <div className="wrapper">
          <h2>Current Cards:</h2>
          <CardList cards={cards} loading={loading} />
        </div>
      </main>
    </>
  )
}

export default App;