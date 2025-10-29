import './GameCard.css';

interface Game {
  id: string;
  title: string;
  genre?: string;
  platform?: string;
  year?: number;
  description?: string;
  image?: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="game-card card fade-in">
      {game.image && (
        <div className="game-image">
          <img src={game.image} alt={game.title} />
        </div>
      )}
      <div className="game-content">
        <h3 className="game-title">{game.title}</h3>
        {game.genre && (
          <p className="game-info">
            <span className="info-label">Genre:</span> {game.genre}
          </p>
        )}
        {game.platform && (
          <p className="game-info">
            <span className="info-label">Platform:</span> {game.platform}
          </p>
        )}
        {game.year && (
          <p className="game-info">
            <span className="info-label">Year:</span> {game.year}
          </p>
        )}
        {game.description && (
          <p className="game-description">{game.description}</p>
        )}
      </div>
    </div>
  );
};

export default GameCard;
