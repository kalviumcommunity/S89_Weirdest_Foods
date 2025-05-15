import jwt from 'jsonwebtoken';
import User from './userModel.js';

// Middleware to verify JWT token or cookie
export const authenticateUser = async (req, res, next) => {
  try {
    // First try to get token from Authorization header
    let token = null;
    let decoded = null;
    let user = null;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Extract token from header
      token = authHeader.split(' ')[1];

      if (token) {
        try {
          // Verify token
          decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

          // Find user by ID
          user = await User.findById(decoded.userId);

          if (user) {
            // Add user to request object
            req.user = {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role
            };

            // Track authentication method
            req.authMethod = 'token';

            return next();
          }
        } catch (tokenError) {
          console.log('Token verification failed, trying cookie authentication');
          // Continue to cookie authentication if token verification fails
        }
      }
    }

    // If token authentication failed, try cookie authentication
    const username = req.cookies.username;

    if (username) {
      // Find user by username from cookie
      user = await User.findOne({ username });

      if (user) {
        // Add user to request object
        req.user = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        };

        // Track authentication method
        req.authMethod = 'cookie';

        return next();
      }
    }

    // If both authentication methods fail
    return res.status(401).json({
      message: 'Authentication required. Please log in.'
    });

  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middleware to check if user is admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

// Middleware specifically for cookie authentication
export const authenticateWithCookie = async (req, res, next) => {
  try {
    const username = req.cookies.username;

    if (!username) {
      return res.status(401).json({
        message: 'Authentication required. No cookie found.'
      });
    }

    // Find user by username from cookie
    const user = await User.findOne({ username });

    if (!user) {
      // Clear the invalid cookie
      res.clearCookie('username', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return res.status(401).json({
        message: 'Invalid authentication. User not found.'
      });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // Track authentication method
    req.authMethod = 'cookie';

    next();
  } catch (error) {
    console.error('Cookie authentication error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Middleware to refresh the cookie expiration
export const refreshCookie = (req, res, next) => {
  const username = req.cookies.username;

  if (username) {
    // Refresh the cookie with a new expiration time
    res.cookie('username', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
  }

  next();
};
