

import { useEffect, useState } from 'react';
import { apiRequest } from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { token, user } = useAuth();
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const [watchlist, watched] = await Promise.all([
        apiRequest('/watchlist/mine', 'GET', null, token),
        apiRequest('/watched/mine', 'GET', null, token),
      ]);
      setWatchlistCount(watchlist.length);
      setWatchedCount(watched.length);
    };

    loadData().catch(console.error);
  }, [token]);

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <div className="grid two-col">
        <div className="card">
          <h2>My Watchlist</h2>
          <p>{watchlistCount} movies</p>
        </div>
        <div className="card">
          <h2>Watched Movies</h2>
          <p>{watchedCount} movies</p>
        </div>
      </div>
    </div>
  );
}


