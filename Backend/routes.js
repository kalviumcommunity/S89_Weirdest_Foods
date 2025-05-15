import express from 'express';
import Item from './schema.js';
import {
  createFoodValidation,
  updateFoodValidation,
  deleteFoodValidation,
  getFoodValidation
} from './validators.js';
import {
  authenticateUser,
  isAdmin,
  refreshCookie,
  authenticateWithCookie
} from './authMiddleware.js';

const router = express.Router();

router.post('/foods', authenticateUser, createFoodValidation, async (req, res) => {
    try {
        // Add the user ID to the item data
        const itemData = {
            ...req.body,
            created_by: req.user.id
        };

        const newItem = new Item(itemData);
        await newItem.save();
        res.status(201).json({ message: 'Foods created successfully', data: newItem });
    } catch (error) {
        console.error('Error creating foods:', error.message);
        // Check if it's a Mongoose validation error
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                errors: validationErrors
            });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/foods/:id', refreshCookie, getFoodValidation, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('created_by', 'username email')
            .exec();

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Food item retrieved successfully', data: item });
    } catch (error) {
        console.error('Error fetching item:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all food items
router.get('/foods', refreshCookie, async (req, res) => {
    try {
        // Check if there's a user filter
        const filter = {};
        if (req.query.userId) {
            filter.created_by = req.query.userId;
        }

        // Populate the created_by field with user information
        const items = await Item.find(filter)
            .populate('created_by', 'username email')
            .exec();

        res.status(200).json({ message: 'Food items retrieved successfully', data: items });
    } catch (error) {
        console.error('Error fetching items:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/foods/:id', authenticateUser, updateFoodValidation, async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Food Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error.message);
        // Check if it's a Mongoose validation error
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                message: 'Validation error',
                errors: validationErrors
            });
        }
        // Check if it's a CastError (invalid ID)
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/foods/:id', authenticateUser, deleteFoodValidation, async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Food Item deleted successfully', data: deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        // Check if it's a CastError (invalid ID)
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Test route for cookie authentication
router.get('/cookie-protected', authenticateWithCookie, (req, res) => {
    res.status(200).json({
        message: 'You accessed a cookie-protected route',
        user: {
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Test route for dual authentication (token or cookie)
router.get('/dual-protected', authenticateUser, (req, res) => {
    res.status(200).json({
        message: 'You accessed a dual-protected route',
        user: {
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        },
        authMethod: req.authMethod || 'unknown'
    });
});

export default router;