/* eslint-disable react/prop-types */
import React from 'react';
import Item from './Item';

const ItemList = ({ items, handleAddToProductList }) => {
  return (
    <div className="item-list">
      {items &&
        items.map((product) => (
          <Item
            key={product.id}
            product={product}
            handleAddToProductList={handleAddToProductList}
          />
        ))}
    </div>
  );
};

export default ItemList;
