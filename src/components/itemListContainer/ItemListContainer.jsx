import React, { useState } from 'react';
import ItemList from './ItemList';
import useGetItems from '../../hooks/useGetItems';
import FilterItems from './FilterItems';

const ItemListContainer = ({ productList, handleAddToProductList }) => {
  const items = useGetItems();
  const [filteredItems, setFilteredItems] = useState(items);
  const handleFilter = (filterText) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <div>
      <FilterItems items={items} onFilter={handleFilter} />
      {filteredItems.length > 0 ? (
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
    </div>
  );
};

export default ItemListContainer;
