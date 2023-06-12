import React, { useState } from 'react';

const FilterItems = ({ items, onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="filter-items">
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Filter by name..."
        className="search-input"
      />
    </div>
  );
};

export default FilterItems;
