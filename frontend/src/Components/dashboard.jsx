import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [foodToDelete, setFoodToDelete] = useState(null);

  useEffect(() => {
    // Fetch the food data from the backend
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:4000/food/getFoodAll');
        setFoods(response.data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:4000/food/deleteFood/${id}`);
        setFoods(foods.filter(food => food._id !== id)); // Remove the deleted item from the state
      } catch (error) {
        console.error('Error deleting food:', error);
      }
    }
  };

  return (
    <>
      <div className="App">
        <div className="fajitas-header">
          Admin Dashboard
        </div>
      </div>
      
      <div className="food-list">
        <Link to="/add" className="add-food-button">Add Food</Link>
        <table className="food-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name and Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => {
              const imageUrl = `http://localhost:4000/uploads/${food.image}`;
              return (
                <tr key={food._id}>
                  <td>
                    <img 
                      src={imageUrl} 
                      alt={food.name} 
                      className="food-image" 
                      onError={(e) => e.target.style.display = 'none'} // Hide image if not found
                    />
                  </td>
                  <td>
                    <span className="food-name">{food.name}</span>
                    <span className="food-price">{food.price.toFixed(2)} DT</span>
                  </td>
                  <td>
                    <Link to={`/food/${food._id}`} className="details-button">Update</Link>
                    <button onClick={() => handleDelete(food._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
