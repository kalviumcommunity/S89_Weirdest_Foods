import express from 'express';
import jwt from 'jsonwebtoken';
import User from './userModel.js';
import { registerValidation, loginValidation } from './authValidators.js';

const router = express.Router();

// Register a new user
router.post('/register', registerValidation, async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: req.body.email },
        { username: req.body.username }
      ]
    });

    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      if (existingUser.username === req.body.username) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Save user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Set username in cookie
    res.cookie('username', newUser.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'lax', // Helps with CSRF
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return success response with token
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login user
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(req.body.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Set username in cookie
    res.cookie('username', user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'lax', // Helps with CSRF
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return success response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all users (for dropdown)
router.get('/users', async (req, res) => {
  try {
    // Only return necessary fields for the dropdown
    const users = await User.find({}, 'username email _id');
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  try {
    // Clear the username cookie
    res.clearCookie('username', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Check if user is authenticated via cookie
router.get('/check-auth', (req, res) => {
  try {
    // Check if username cookie exists
    const username = req.cookies.username;

    if (username) {
      return res.status(200).json({
        authenticated: true,
        username
      });
    }

    res.status(200).json({ authenticated: false });
  } catch (error) {
    console.error('Auth check error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
