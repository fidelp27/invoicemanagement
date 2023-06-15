import React from 'react';

const Item = ({ product, handleAddToProductList }) => {
  const { id, title, description, thumbnail, price } = product;

  return (
    <div className="item-card">
      <div className="item-card-image">
        <img src={thumbnail} loading="lazy" alt={title} />
      </div>
      <div className="item-card-details">
        <h3>{title}</h3>
        <p>Description: {description}</p>
        <p className="price">Price: ${price}</p>
      </div>
      <div className="item-card-actions">
        <button onClick={() => handleAddToProductList(product)}>
          Add to Invoice
        </button>
      </div>
    </div>
  );
};

export default Item;
