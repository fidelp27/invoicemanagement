/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import AsideContainer from './AsideContainer';

const FormInvoice = ({
  handleShowAside,
  isAsideOpen,
  invoiceData,
  setInvoiceData,
  handleSubmit,
  handleCancel,
}) => {
  //Modificar cantidad de items y precio total
  const handleQuantityChange = (itemId, quantity) => {
    const updatedItems = invoiceData.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + quantity,
          total: (item.quantity + quantity) * item.price,
        };
      }
      return item;
    });

    setInvoiceData({ ...invoiceData, items: updatedItems });
  };

  //Actualizar total al cambiar items
  useEffect(() => {
    const total = invoiceData.items.reduce((acc, item) => acc + item.total, 0);
    setInvoiceData({ ...invoiceData, total });
  }, [invoiceData.items]);

  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>Form Invoice</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="invoiceNumber">
          Invoice Number:
          <input
            type="text"
            value={invoiceData.invoiceNumber}
            id="invoiceNumber"
            disabled
          />
        </label>
        <label htmlFor="date">
          Date:
          <input type="text" id="date" value={invoiceData.date} disabled />
        </label>
        <label htmlFor="customerName">
          Customer Name:
          <input
            type="text"
            id="customerName"
            value={invoiceData.customerName}
            onChange={(e) =>
              setInvoiceData({
                ...invoiceData,
                customerName: e.target.value,
              })
            }
          />
        </label>

        <div>
          <h3>Product List</h3>
          <ul>
            {invoiceData.items.map((product) => (
              <li key={product.id}>
                <div>Name: {product.title}</div>
                <div>Amount: ${product.price}</div>
                <div>
                  <button
                    type="button"
                    className="qtyButton"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </button>
                  Quantity: {product.quantity}
                  <button
                    type="button"
                    className="qtyButton"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    -
                  </button>
                </div>
                <div>Total:${product.total} </div>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </AsideContainer>
  );
};

export default FormInvoice;
