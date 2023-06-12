import React, { useState } from 'react';
import ItemList from './ItemList';
import useGetItems from '../../hooks/useGetItems';
import FilterItems from './FilterItems';

const ItemListContainer = () => {
  const items = useGetItems();
  const [filteredItems, setFilteredItems] = useState(items);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const handleFilter = (filterText) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(filterText.toLowerCase())
    );

    setFilteredItems(filtered);
  };
  const handleAddToInvoice = (product) => {
    setInvoiceItems([...invoiceItems, product]);
  };

  return (
    <div>
      <FilterItems items={items} onFilter={handleFilter} />
      {filteredItems.length > 0 ? (
        <ItemList
          items={filteredItems}
          handleAddToInvoice={handleAddToInvoice}
        />
      ) : (
        <ItemList items={items} handleAddToInvoice={handleAddToInvoice} />
      )}
    </div>
  );
};

export default ItemListContainer;
