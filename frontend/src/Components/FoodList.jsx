import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FoodList.css';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

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
    try {
      await axios.delete(`http://localhost:4000/food/deleteFood/${id}`);
      setFoods(foods.filter(food => food._id !== id)); // Remove the deleted item from the state
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  return (
    <>
      <header className="App-header">
        <img src="/foodwall.png" alt="Food Wall" />
        <p className="text2-overlay">Chili's Tunisie</p>
        <p className="text3-overlay">Découvrez les </p>
        <p className="text4-overlay">meilleures recettes </p>
        <p className="text5-overlay">  syriennes </p>
        <button  class="image-overlay-button" button >Voir notre menu</button>
        
      </header>

      <div className="App">
        <div className="menu-header">
          <span className="menu-icon">&#127798;</span> {/* Pepper */}
          Notre Menu
          <span className="menu-icon flip-horizontal">&#127798;</span> {/* Flipped Pepper */}
        </div>
        
        <div className="fajitas-header">
          Nos Fajitas
        </div>
      </div>
      
      <div className="food-list">
        <ul>
          {foods.map((food) => {
            const imageUrl = `http://localhost:4000/uploads/${food.image}`;
            return (
              <li key={food._id} className="food-item">
                <img 
                  src={imageUrl} 
                  alt={food.name} 
                  className="food-image" 
                  onError={(e) => e.target.style.display = 'none'} // Hide image if not found
                />
                <span className="food-name">{food.name}</span>
                <span className="food-price">{food.price.toFixed(2)} DT</span>
              </li>
            );
          })}
        </ul>
      </div>
      
      <footer className="App-footer">
  <figure className="image-container">
    <img src="/footer.png" alt="Food Footer" />
    <h6 className="text-overlay">Prendre Contact</h6>
    <form className="contact-form">
      <input type="text" placeholder="Nom et Prénom" />
      <input type="email" placeholder="Adresse Email" />
      <textarea placeholder="Votre message ici..."></textarea>
      <button type="submit">Envoyer</button>
    </form>
  </figure>
</footer>


    </>
  );
};

export default FoodList;
