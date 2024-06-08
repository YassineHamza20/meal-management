import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AddFood.css'; // Optional: Create a CSS file for styling if needed

const AddFood = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:4000/food/addFood', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Food item added successfully!');
      setName('');
      setPrice('');
      setImage(null);
      navigate('/dashboard');
    } catch (error) {
      setError('Error adding food item. Please fill in all the fields.');
    }
  };

  return (
    <div className="add-food">
      <h2>Add Food</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
