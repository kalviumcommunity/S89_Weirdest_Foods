import React, { useState, useEffect } from 'react';
import { getFoodItems, createFoodItem, deleteFoodItem } from './api';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState('');

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getFoodItems();
        setFoods(response.data.data); 
      } catch (error) {
        console.error('Error fetching food items:', error.message);
      }
    };

    fetchFoods();
  }, []);

  const handleCreateFood = async () => {
    try {
      const response = await createFoodItem({ name: newFood });
      setFoods((prevFoods) => [...prevFoods, response.data.data]);
      setNewFood('');
    } catch (error) {
      console.error('Error creating food:', error.message);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await deleteFoodItem(id);
      setFoods((prevFoods) => prevFoods.filter((food) => food._id !== id));
    } catch (error) {
      console.error('Error deleting food:', error.message);
    }
  };

  return (
    <div>
      <h1>Food List</h1>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name}
            <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newFood}
        onChange={(e) => setNewFood(e.target.value)}
        placeholder="Add new food"
      />
      <button onClick={handleCreateFood}>Add Food</button>
    </div>
  );
};

export default FoodList;