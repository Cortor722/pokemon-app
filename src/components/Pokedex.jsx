import { useState } from 'react'

function Pokedex() {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchPokemon = async () => {
    if (!pokemonName.trim()) {
      setError('Please enter a Pokemon name')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase().trim()}`
      )
      
      if (!response.ok) {
        throw new Error('Pokemon not found!')
      }
      
      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setError('Pokemon not found! Try again.')
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPokemon()
    }
  }

  const getStatColor = (statValue) => {
    if (statValue >= 100) return 'bg-green-500'
    if (statValue >= 65) return 'bg-blue-500'
    return 'bg-yellow-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Pokemon name..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={searchPokemon}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {pokemon && (
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto mb-4 w-32 h-32"
          />
          <h2 className="text-2xl font-bold capitalize mb-2">
            {pokemon.name}
          </h2>
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-800"
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Stats</h3>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getStatColor(stat.base_stat)}`}
                      style={{ width: `${Math.min(100, (stat.base_stat / 150) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities Section */}
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Abilities</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {pokemon.abilities.map((ability) => (
                <span
                  key={ability.ability.name}
                  className="px-3 py-1 rounded-full bg-purple-100 text-purple-800"
                >
                  {ability.ability.name.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Height</p>
              <p>{pokemon.height / 10}m</p>
            </div>
            <div>
              <p className="font-bold">Weight</p>
              <p>{pokemon.weight / 10}kg</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pokedex