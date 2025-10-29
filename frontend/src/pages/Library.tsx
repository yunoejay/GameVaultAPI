import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './Library.css';

interface Game {
  id: string;
  title: string;
  genre?: string;
  platform?: string;
  year?: number;
  description?: string;
  image?: string;
}

const Library = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [selectedCategory, games]);

  const fetchGames = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch all available games (FreeToGame has 400+ games)
      const response = await axios.get('/api/games?limit=500');
      setGames(response.data.games || []);
      console.log(`✅ Loaded ${response.data.games?.length || 0} games from FreeToGame API`);
    } catch (err) {
      setError('Failed to load games. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterGames = () => {
    if (selectedCategory === 'all') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => 
        game.genre?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  const categories = [
    { value: 'all', label: 'All Games' },
    { value: 'mmorpg', label: 'MMORPG' },
    { value: 'shooter', label: 'Shooter' },
    { value: 'moba', label: 'MOBA' },
    { value: 'anime', label: 'Anime' },
    { value: 'battle royale', label: 'Battle Royale' },
    { value: 'strategy', label: 'Strategy' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'sci-fi', label: 'Sci-fi' },
    { value: 'card games', label: 'Card Games' },
    { value: 'racing', label: 'Racing' },
    { value: 'fighting', label: 'Fighting' },
    { value: 'social', label: 'Social' },
    { value: 'sports', label: 'Sports' }
  ];

  return (
    <div className="library-page fade-in">
      <div className="library-header">
        <h1>📚 Game Library</h1>
        <p>Browse through our complete collection of games</p>
      </div>

      <div className="library-filters">
        <div className="filter-group">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Loading library...</div>}

      {!loading && !error && filteredGames.length === 0 && (
        <div className="no-games">
          <div className="no-games-icon">📂</div>
          <h2>No games found</h2>
          <p>Try selecting a different category</p>
        </div>
      )}

      {!loading && !error && filteredGames.length > 0 && (
        <div className="library-content">
          <div className="library-stats">
            <p>Showing <strong>{filteredGames.length}</strong> of <strong>{games.length}</strong> games</p>
          </div>
          <div className="games-grid">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
