import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page fade-in">
      <div className="error-content">
        <div className="error-animation">
          <div className="error-code">404</div>
          <div className="error-gamepad">🎮</div>
        </div>
        <h1>Oops! Page Not Found</h1>
        <p className="error-message">
          Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist.
        </p>
        <div className="error-suggestions">
          <h2>Where would you like to go?</h2>
          <div className="error-links">
            <Link to="/" className="btn btn-primary">
              🏠 Home
            </Link>
            <Link to="/library" className="btn btn-secondary">
              📚 Browse Library
            </Link>
            <Link to="/random" className="btn btn-secondary">
              🎲 Random Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
