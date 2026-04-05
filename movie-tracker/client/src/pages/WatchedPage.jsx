/*
import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function WatchedPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    const data = await apiRequest('/watched/mine', 'GET', null, token);
    setEntries(data);
  };

  useEffect(() => {
    loadEntries().catch(console.error);
  }, []);

  const updateEntry = async (entry) => {
    await apiRequest(`/watched/${entry._id}`, 'PUT', {
      userRating: entry.userRating,
      notes: entry.notes,
      watchedDate: entry.watchedDate,
    }, token);
    loadEntries();
  };

  const deleteEntry = async (id) => {
    await apiRequest(`/watched/${id}`, 'DELETE', null, token);
    loadEntries();
  };

  return (
    <div>
      <h1>Watched Movies</h1>
      <div className="grid">
        {entries.map((entry) => (
          <div key={entry._id} className="card">
            <h2>{entry.movie.title}</h2>
            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={entry.userRating || ''}
              onChange={(e) => setEntries((prev) => prev.map((item) => item._id === entry._id ? { ...item, userRating: e.target.value } : item))}
            />
            <label>Notes</label>
            <textarea
              value={entry.notes || ''}
              onChange={(e) => setEntries((prev) => prev.map((item) => item._id === entry._id ? { ...item, notes: e.target.value } : item))}
            />
            <div className="button-row">
              <button onClick={() => updateEntry(entry)}>Save</button>
              <button onClick={() => deleteEntry(entry._id)}>Delete</button>
            </div>
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

export default function WatchedPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState([]);

  const loadEntries = async () => {
    try {
      const data = await apiRequest('/watched/mine', 'GET', null, token);
      setEntries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading watched entries:', error);
      setEntries([]);
    }
  };

  useEffect(() => {
    if (token) {
      loadEntries().catch(console.error);
    }
  }, [token]);

  const updateEntry = async (entry) => {
    try {
      await apiRequest(
        `/watched/${entry._id}`,
        'PUT',
        {
          userRating: entry.userRating,
          notes: entry.notes,
          watchedDate: entry.watchedDate,
        },
        token
      );
      await loadEntries();
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await apiRequest(`/watched/${id}`, 'DELETE', null, token);
      await loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  return (
    <div>
      <h1>Watched Movies</h1>
      <div className="grid">
        {entries.map((entry) => (
          <div key={entry._id} className="card">

            {entry.movie?.posterUrl && <img src={entry.movie.posterUrl} alt={`${entry.movie.title} poster`} style={{ width: '10%' }} />}

            <h2>{entry.movie?.title || 'Movie not found'}</h2>


            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={entry.userRating || ''}
              onChange={(e) =>
                setEntries((prev) =>
                  prev.map((item) =>
                    item._id === entry._id
                      ? { ...item, userRating: e.target.value }
                      : item
                  )
                )
              }
            />

            <label>Notes</label>
            <textarea
              value={entry.notes || ''}
              onChange={(e) =>
                setEntries((prev) =>
                  prev.map((item) =>
                    item._id === entry._id
                      ? { ...item, notes: e.target.value }
                      : item
                  )
                )
              }
            />

            <div className="button-row">
              <button onClick={() => updateEntry(entry)}>Save</button>
              <button onClick={() => deleteEntry(entry._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
