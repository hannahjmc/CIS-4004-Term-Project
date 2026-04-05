import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav className="nav">
        <div>
          <Link to="/dashboard" className="brand">It's Giving Cinema</Link>
        </div>
        {user && (
          <div className="nav-links">
            <Link to="/movies">Movies</Link>
            <Link to="/watchlist">Watchlist</Link>
            <Link to="/watched">Watched</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <span>{user.username} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </nav>
      <main className="container">{children}</main>
    </div>
  );
}
