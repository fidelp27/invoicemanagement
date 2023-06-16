/* eslint-disable react/prop-types */
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Menu = ({ handleShowAside, isAsideOpen }) => {
  return (
    <div className={`menu-btn ${isAsideOpen ? 'hide' : 'open'}`}>
      <button className="menu-icon" onClick={handleShowAside}>
        <Link to="/menu">
          <FaBars />
        </Link>
      </button>
    </div>
  );
};

export default Menu;
