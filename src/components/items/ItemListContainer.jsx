/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import ItemList from './ItemList';
import useGetItems from '../../hooks/useGetItems';
import FilterItems from './FilterItems';

const ItemListContainer = ({ handleAddToProductList }) => {
  //State
  const { items, error } = useGetItems();
  const [filteredItems, setFilteredItems] = useState(items);

  //Filter items
  const handleFilter = (filterText) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <div>
      <div>
        {!error ? (
          <>
            {/* Buscador */}
            <FilterItems items={items} onFilter={handleFilter} />

            {/* Lista de items condicionada a elemento filtrado*/}
            {filteredItems && filteredItems.length > 0 ? (
              <ItemList
                items={filteredItems}
                handleAddToProductList={handleAddToProductList}
              />
            ) : (
              <ItemList
                items={items}
                handleAddToProductList={handleAddToProductList}
              />
            )}
          </>
        ) : (
          <h2>Something went wrong</h2>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
