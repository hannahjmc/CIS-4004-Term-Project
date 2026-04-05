import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-passwordHash').sort({ createdAt: -1 });
  res.json(users);
};

export const createUserByAdmin = async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash, role });
  res.status(201).json({ id: user._id, username: user.username, role: user.role });
};

export const updateUser = async (req, res) => {
  const updates = { ...req.body };
  if (updates.password) {
    updates.passwordHash = await bcrypt.hash(updates.password, 10);
    delete updates.password;
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'User deleted' });
};
