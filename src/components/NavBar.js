import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style/NavBar.css'; // Import the CSS file for styles

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold nav-buttons">
          <button onClick={() => navigate('/')} className="px-4 py-2 hover:bg-gray-700 rounded">
            Home
          </button>
          <button onClick={() => navigate('/about')} className="px-4 py-2 hover:bg-gray-700 rounded">
            About
          </button>
          <button onClick={() => navigate('/projects')} className="px-4 py-2 hover:bg-gray-700 rounded">
            Projects
          </button>
          <button onClick={() => navigate('/contact')} className="px-4 py-2 hover:bg-gray-700 rounded">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
