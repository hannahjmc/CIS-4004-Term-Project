import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function AdminPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });

  const loadData = async () => {
    const [usersData, moviesData, reviewsData] = await Promise.all([
      apiRequest('/users', 'GET', null, token),
      apiRequest('/movies', 'GET', null, token),
      apiRequest('/reviews', 'GET', null, token),
    ]);
    setUsers(usersData);
    setMovies(moviesData);
    setReviews(reviewsData);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    await apiRequest('/users', 'POST', newUser, token);
    setNewUser({ username: '', password: '', role: 'user' });
    loadData();
  };

  const deleteUser = async (id) => {
    await apiRequest(`/users/${id}`, 'DELETE', null, token);
    loadData();
  };

  const deleteMovie = async (id) => {
    await apiRequest(`/movies/${id}`, 'DELETE', null, token);
    loadData();
  };

  const deleteReview = async (id) => {
    await apiRequest(`/reviews/${id}`, 'DELETE', null, token);
    loadData();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="grid two-col">
        <div className="card">
          <h2>Create User</h2>
          <form onSubmit={createUser}>
            <input placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
            <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="user">Standard User</option>
              <option value="admin">Administrator</option>
            </select>
            <button type="submit">Create User</button>
          </form>
        </div>
        <div className="card">
          <h2>System Totals</h2>
          <p>Users: {users.length}</p>
          <p>Movies: {movies.length}</p>
          <p>Reviews: {reviews.length}</p>
        </div>
      </div>

      <div className="card">
        <h2>Manage Users</h2>
        {users.map((user) => (
          <div key={user._id} className="row-between">
            <span>{user.username} - {user.role}</span>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Manage Movies</h2>
        {movies.map((movie) => (
          <div key={movie._id} className="row-between">
            <span>{movie.title} ({movie.releaseYear})</span>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Manage Reviews</h2>
        {reviews.map((review) => (
          <div key={review._id} className="row-between">
            <span>{review.movie?.title} - {review.user?.username}: {review.rating}/5</span>
            <button onClick={() => deleteReview(review._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
