import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400).json({ message: 'Email already registered' });
      return 
    }

    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    res.status(401).json({ message: 'Invalid credentials' });
    if (!user || !(await user.comparePassword(password))) {
      return
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
        res.status(404).json({ message: 'User not found' });
      return 
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};