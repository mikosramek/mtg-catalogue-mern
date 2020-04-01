import React from 'react';

import './styles/style.scss';

import Header from './components/Header';

import CardList from './components/CardList';

const App = props => {

  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  return(
    <>
      <Header setCards={setCards} setLoading={setLoading} />
      <main>
        <div className="wrapper">
          <CardList cards={cards} loading={loading} />
        </div>
      </main>
    </>
  )
}

export default App;