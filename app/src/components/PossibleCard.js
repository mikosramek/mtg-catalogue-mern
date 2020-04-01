import React from 'react';

const PossibleCard = props => {
  const [owned, setOwned] = React.useState(1);
  const [used, setUsed] = React.useState(0);
  return(
    <li className={`${props.gettingCard ? 'disabled' : ''}`}>
      <p>{props.card}</p>
      <label htmlFor="owned">Owned:</label>
      <input 
        type="number" 
        id="owned" 
        value={owned}
        onChange={e => setOwned(e.target.value)} 
      />
      <label htmlFor="used">Used:</label>
      <input 
        type="number" 
        id="used" 
        value={used}
        onChange={e => setUsed(e.target.value)} 
      />
      <button 
        onClick={() => {
          props.submitCard({name: props.card, owned: owned, used:used})
        }}
        disabled={props.gettingCard}
      >Add Card</button>
    </li>
  )
}

export default PossibleCard;