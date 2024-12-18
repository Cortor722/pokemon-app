import './App.css'
import Pokedex from './components/Pokedex'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Pokédex</h1>
        <Pokedex />
      </div>
    </div>
  )
}

export default App