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
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function fetchAndSet() {
      if (!pokemonName.length) return
      setPokemon(null)
      setError(null)
      try {
        const pokemonData = await fetchPokemon(pokemonName)
        setPokemon(pokemonData)
      } catch (e) {
        setError(e)
      }
    }

    fetchAndSet()
  }, [pokemonName])

  if (error)
    return (
      <div role="alert">
        {' '}
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>{' '}
      </div>
    )
  else if (!pokemonName.length) return 'Submit a pokemon'
  else if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
  else return <PokemonDataView pokemon={pokemon} />
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
