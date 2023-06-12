import React from 'react';
import Item from './Item';

const ItemList = ({ items, handleAddToInvoice }) => {
  return (
    <div className="item-list">
      {items.map((product) => (
        <Item
          key={product.id}
          product={product}
          handleAddToInvoice={handleAddToInvoice}
        />
      ))}
    </div>
  );
};

export default ItemList;
