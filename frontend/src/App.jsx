import React from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import './App.css';
import FoodList from './Components/FoodList';
import FoodDetails from './Components/details';
import AddFood from './Components/add';
import Dashboard from './Components/dashboard';
function App() {
  return (
    <>
    <Router>
     
      <Routes>
            <Route path="/" element={<FoodList />} />
            <Route path="/add" element={<AddFood />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="*" element={<Navigate to="/notfound" />} />
          </Routes>
    </Router>
    </>
  );
}

export default App;
