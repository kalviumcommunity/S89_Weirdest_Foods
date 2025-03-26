const express = require('express');
const router = express.Router();
const Item = require('./schema');

router.post('/foods', async (req, res) => {
    try {
        const newItem = new Item(req.body); 
        await newItem.save(); 
        res.status(201).json({ message: 'Foods created successfully', data: newItem }); 
    } catch (error) {
        console.error('Error creating foods:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/foods/:id', async (req, res) => {
    try {
        const items = await Item.find(); 
        res.status(200).json({ message: 'pong', data: items });
    } catch (error) {
        console.error('Error fetching items:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.put('/foods/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Food Item updated successfully', data: updatedItem });
    } catch (error) {
        console.error('Error updating item:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.delete('/foods/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' }); 
        }
        res.status(200).json({ message: 'Food Item deleted successfully', data: deletedItem });
    } catch (error) {
        console.error('Error deleting item:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router; 