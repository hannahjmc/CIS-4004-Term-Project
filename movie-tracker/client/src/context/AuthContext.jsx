import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (username, password) => {
    const data = await apiRequest('/auth/login', 'POST', { username, password });
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (username, password) => {
    const data = await apiRequest('/auth/register', 'POST', { username, password });
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) return;
    const me = await apiRequest('/auth/me', 'GET', null, token);
    setUser(me);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
