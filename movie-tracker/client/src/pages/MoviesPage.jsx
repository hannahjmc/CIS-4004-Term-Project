import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function MoviesPage() {
  const { token, user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', genre: '', director: '', releaseYear: '', posterUrl: '' });
  const [reviewForms, setReviewForms] = useState({});

  const loadMovies = async () => {
    const data = await apiRequest('/movies', 'GET', null, token);
    setMovies(data);
  };

  useEffect(() => {
    loadMovies().catch(console.error);
  }, []);

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    await apiRequest('/movies', 'POST', { ...form, releaseYear: Number(form.releaseYear) }, token);
    setForm({ title: '', description: '', genre: '', director: '', releaseYear: '', posterUrl: '' });
    loadMovies();
  };

  const addToWatchlist = async (movieId) => {
    await apiRequest('/watchlist', 'POST', { movie: movieId, priority: 'medium' }, token);
    alert('Added to watchlist');
  };

  const addToWatched = async (movieId) => {
    await apiRequest('/watched', 'POST', { movie: movieId, userRating: 5, notes: '' }, token);
    alert('Added to watched list');
  };

  const submitReview = async (movieId) => {
    const review = reviewForms[movieId] || { rating: 5, comment: '' };
    await apiRequest('/reviews', 'POST', { movie: movieId, rating: Number(review.rating), comment: review.comment }, token);
    alert('Review submitted');
    setReviewForms((prev) => ({ ...prev, [movieId]: { rating: 5, comment: '' } }));
  };

  return (
    <div>
      <h1>Movies</h1>

      {user?.role === 'admin' && (
        <div className="card">
          <h2>Add Movie</h2>
          <form className="grid" onSubmit={handleCreateMovie}>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input placeholder="Genre" value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
            <input placeholder="Director" value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} />
            <input placeholder="Release Year" value={form.releaseYear} onChange={(e) => setForm({ ...form, releaseYear: e.target.value })} required />
            <input placeholder="Poster URL" value={form.posterUrl} onChange={(e) => setForm({ ...form, posterUrl: e.target.value })} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button type="submit">Create Movie</button>
          </form>
        </div>
      )}

      <div className="grid">
        {movies.map((movie) => (
          <div key={movie._id} className="card">
            <h2>{movie.title} ({movie.releaseYear})</h2>
            {movie.posterUrl && <img src={movie.posterUrl} alt={`${movie.title} poster`} style={{ width: '10%' }} />}
            <p><strong>Genre:</strong> {movie.genre || 'N/A'}</p>
            <p><strong>Director:</strong> {movie.director || 'N/A'}</p>
            <p>{movie.description}</p>
            <div className="button-row">
              <button onClick={() => addToWatchlist(movie._id)}>Want to Watch</button>
              <button onClick={() => addToWatched(movie._id)}>Already Watched</button>
            </div>
            <div className="review-box">
              <h3>Leave a review</h3>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating"
                value={reviewForms[movie._id]?.rating ?? 5}
                onChange={(e) => setReviewForms((prev) => ({ ...prev, [movie._id]: { ...(prev[movie._id] || {}), rating: e.target.value } }))}
              />
              <textarea
                placeholder="Comment"
                value={reviewForms[movie._id]?.comment ?? ''}
                onChange={(e) => setReviewForms((prev) => ({ ...prev, [movie._id]: { ...(prev[movie._id] || {}), comment: e.target.value } }))}
              />
              <button onClick={() => submitReview(movie._id)}>Submit Review</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
