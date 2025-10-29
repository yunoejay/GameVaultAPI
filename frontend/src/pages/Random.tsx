import { useState } from 'react';
import axios from 'axios';
import GameCard from '../components/GameCard';
import './Random.css';

interface Game {
  id: string;
  title: string;
  genre?: string;
  platform?: string;
  year?: number;
  description?: string;
  image?: string;
}

const Random = () => {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomGame = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/api/games/random');
      setGame(response.data);
    } catch (err) {
      setError('Failed to fetch a random game. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="random-page fade-in">
      <div className="random-header">
        <h1>🎲 Random Game Discovery</h1>
        <p>Not sure what to play? Let us pick a random game for you!</p>
      </div>

      <div className="random-action">
        <button
          onClick={fetchRandomGame}
          className="btn btn-primary btn-large"
          disabled={loading}
        >
          {loading ? 'Finding a game...' : '🎯 Get Random Game'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {game && !loading && (
        <div className="random-result">
          <h2>Your Random Pick:</h2>
          <div className="random-game-container">
            <GameCard game={game} />
          </div>
          <button
            onClick={fetchRandomGame}
            className="btn btn-secondary"
          >
            🔄 Get Another One
          </button>
        </div>
      )}

      {!game && !loading && !error && (
        <div className="random-placeholder">
          <div className="placeholder-icon">🎮</div>
          <p>Click the button above to discover a random game!</p>
        </div>
      )}
    </div>
  );
};

export default Random;
