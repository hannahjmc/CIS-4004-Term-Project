/*
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function WatchlistPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    const data = await apiRequest('/watchlist/mine', 'GET', null, token);
    setEntries(data);
  };

  useEffect(() => {
    loadEntries().catch(console.error);
  }, []);

  const updatePriority = async (id, priority) => {
    await apiRequest(`/watchlist/${id}`, 'PUT', { priority }, token);
    loadEntries();
  };

  const deleteEntry = async (id) => {
    await apiRequest(`/watchlist/${id}`, 'DELETE', null, token);
    loadEntries();
  };

  return (
    <div>
      <h1>My Watchlist</h1>
      <div className="grid">
        {entries.map((entry) => (
          <div key={entry._id} className="card">
            <h2>{entry.movie.title}</h2>
            <p>Priority: {entry.priority}</p>
            <select value={entry.priority} onChange={(e) => updatePriority(entry._id, e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={() => deleteEntry(entry._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
*/

import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function WatchlistPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    try {
      const data = await apiRequest('/watchlist/mine', 'GET', null, token);
      setEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setEntries([]);
    }
  };

  useEffect(() => {
    if (token) {
      loadEntries();
    }
  }, [token]);

  const updatePriority = async (id, priority) => {
    try {
      await apiRequest(`/watchlist/${id}`, 'PUT', { priority }, token);
      await loadEntries();
    } catch (error) {
      console.error('Error updating priority:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await apiRequest(`/watchlist/${id}`, 'DELETE', null, token);
      await loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <h1>My Watchlist</h1>
      <div className="grid">
        {entries.map((entry) => (
          <div key={entry._id} className="card">

            {entry.movie?.posterUrl && <img src={entry.movie.posterUrl} alt={`${entry.movie.title} poster`} style={{ width: '10%' }} />}

            <h2>{entry.movie?.title || 'Movie not found'}</h2>
            <p>Priority: {entry.priority}</p>
            <select
              value={entry.priority}
              onChange={(e) => updatePriority(entry._id, e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button onClick={() => deleteEntry(entry._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}