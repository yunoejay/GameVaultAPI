import { useState, FormEvent } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './Search.css';

interface Game {
  id: string;
  title: string;
  genre?: string;
  platform?: string;
  year?: number;
  description?: string;
  image?: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);
    
    try {
      const response = await axios.get(`/api/games/search?query=${encodeURIComponent(query)}`);
      setGames(response.data.games || []);
    } catch (err) {
      setError('Failed to search games. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page fade-in">
      <div className="search-header">
        <h1>🔍 Search Games</h1>
        <p>Find your favorite games by title, genre, or platform</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            placeholder="Search for games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Searching for games...</div>}

      {!loading && searched && games.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">😔</div>
          <h2>No games found</h2>
          <p>Try searching with different keywords</p>
        </div>
      )}

      {!loading && games.length > 0 && (
        <div className="search-results">
          <h2 className="results-title">
            Found {games.length} {games.length === 1 ? 'game' : 'games'}
          </h2>
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}

      {!searched && !loading && (
        <div className="search-placeholder">
          <div className="placeholder-icon">🎮</div>
          <p>Enter a search term to find games</p>
        </div>
      )}
    </div>
  );
};

export default Search;
