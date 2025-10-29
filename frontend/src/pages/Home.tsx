import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page fade-in">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to GameVault</h1>
        <p className="hero-subtitle">
          Your ultimate destination for discovering and exploring amazing games
        </p>
        <div className="hero-description">
          <p>
            GameVault is your personal gaming library where you can browse through
            an extensive collection of games, search for your favorites, discover
            random titles, and build your perfect gaming collection.
          </p>
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Explore Our Features</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <div className="feature-icon">🎲</div>
            <h3>Random Discovery</h3>
            <p>
              Feel adventurous? Let us surprise you with random game
              recommendations from our vast library.
            </p>
            <Link to="/random" className="btn btn-primary">
              Try Random
            </Link>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>
              Find exactly what you're looking for with our powerful search
              engine. Search by title, genre, or platform.
            </p>
            <Link to="/search" className="btn btn-primary">
              Start Searching
            </Link>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">📚</div>
            <h3>Full Library</h3>
            <p>
              Browse through our complete collection of games. Filter, sort,
              and explore thousands of titles.
            </p>
            <Link to="/library" className="btn btn-primary">
              View Library
            </Link>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Exploring?</h2>
        <p>Dive into our extensive game collection and find your next favorite title!</p>
        <Link to="/library" className="btn btn-primary btn-large">
          Browse All Games
        </Link>
      </div>
    </div>
  );
};

export default Home;
