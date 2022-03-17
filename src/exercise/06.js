// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
  PokemonForm,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // Gets called whenever we submit a new pokemon
  const [pokemon, setPokemon] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) return
    setStatus('pending')
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      })
      .catch(e => {
        setError(e)
        setStatus('rejected')
      })
  }, [pokemonName])

  if (status === 'rejected')
    return (
      <div role="alert">
        {' '}
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>{' '}
      </div>
    )
  else if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
