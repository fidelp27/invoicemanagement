/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const FilterItems = ({ onFilter }) => {
  //state
  const [filterText, setFilterText] = useState('');

  //On change del input
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="filter-items">
      <input
        type="text"
        id="filterInput"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter by name..."
        className="search-input"
      />
    </div>
  );
};

export default FilterItems;
