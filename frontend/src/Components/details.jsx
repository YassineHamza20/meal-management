import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Uncomment this if you have a CSS file for styling
// import './FoodDetails.css';

const FoodDetails = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [food, setFood] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [name, setName] = useState(''); // State for updated name
  const [price, setPrice] = useState(''); // State for updated price
  const [image, setImage] = useState(null); // State for the image file

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/food/getFoodbyid/${id}`);
        setFood(response.data);
        setName(response.data.name); // Set initial values for editing
        setPrice(response.data.price);
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/food/deleteFood/${id}`);
      navigate('/'); // Navigate back to the food list after deletion
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/food/updateFoodbyid/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditing(false);
      navigate('/dashboard'); // Redirect or handle the response
    } catch (error) {
      console.error('Error updating food:', error);
    }
  };
  

  if (!food) {
    return <div>Loading...</div>;
  }


  
  return (
    <div className="food-details">
      <img 
        src={`http://localhost:4000/uploads/${food.image}`} 
        alt={food.name} 
        className="food-image" 
      />
      {true ? (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
  <label htmlFor="image">Image</label>
  <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
</div>
          <button type="submit" className="save-button">Save</button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>

          <h1 className="food-name">{food.name}</h1>
          <p className="food-price">{food.price.toFixed(2)} DT</p>
          <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
          

        </>
      )}
    </div>
  );
};

export default FoodDetails;
