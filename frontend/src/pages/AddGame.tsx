import { useState } from 'react';
import axios from 'axios';
import './AddGame.css';

type FormState = {
  title: string;
  genre?: string;
  platform?: string;
  year?: string;
  description?: string;
  image?: string;
  gameUrl?: string;
  developer?: string;
  publisher?: string;
};

const initialState: FormState = {
  title: '',
  genre: '',
  platform: '',
  year: '',
  description: '',
  image: '',
  gameUrl: '',
  developer: '',
  publisher: '',
};

const AddGame = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const payload: any = {
        title: form.title.trim(),
        genre: form.genre?.trim() || undefined,
        platform: form.platform?.trim() || undefined,
        year: form.year ? parseInt(form.year, 10) : undefined,
        description: form.description?.trim() || undefined,
        image: form.image?.trim() || undefined,
        gameUrl: form.gameUrl?.trim() || undefined,
        developer: form.developer?.trim() || undefined,
        publisher: form.publisher?.trim() || undefined,
      };

      await axios.post('/api/games', payload);
      setMessage('Game saved to database!');
      setForm(initialState);
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to save game';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-game-page fade-in">
      <div className="form-header">
        <h1>➕ Add Game to Database</h1>
        <p>Enter details to store a game in MySQL</p>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <form className="game-form card" onSubmit={submit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input id="genre" name="genre" value={form.genre} onChange={onChange} placeholder="e.g. Shooter" />
          </div>
          <div className="form-group">
            <label htmlFor="platform">Platform</label>
            <input id="platform" name="platform" value={form.platform} onChange={onChange} placeholder="e.g. PC" />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input id="year" name="year" value={form.year} onChange={onChange} type="number" min={1970} max={2100} placeholder="e.g. 2023" />
          </div>
          <div className="form-group full">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={onChange} placeholder="Short description" rows={4} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" value={form.image} onChange={onChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label htmlFor="gameUrl">Game URL</label>
            <input id="gameUrl" name="gameUrl" value={form.gameUrl} onChange={onChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label htmlFor="developer">Developer</label>
            <input id="developer" name="developer" value={form.developer} onChange={onChange} placeholder="Developer name" />
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input id="publisher" name="publisher" value={form.publisher} onChange={onChange} placeholder="Publisher name" />
          </div>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Game'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame;
