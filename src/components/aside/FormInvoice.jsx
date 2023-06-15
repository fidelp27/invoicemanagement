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

    setInvoiceData((prevData) => ({
      ...prevData,
      items: updatedItems,
    }));
  };

  useEffect(() => {
    const total = invoiceData.items.reduce((acc, item) => acc + item.total, 0);
    setInvoiceData((prevData) => ({
      ...prevData,
      total: total,
    }));
  }, [invoiceData.items]);

  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>Form Invoice</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Invoice Number:
          <input type="text" value={invoiceData.invoiceNumber} disabled />
        </label>
        <label>
          Date:
          <input type="text" value={invoiceData.date} disabled />
        </label>
        <label>
          Customer Name:
          <input
            type="text"
            value={invoiceData.customerName}
            onChange={(e) =>
              setInvoiceData((prevData) => ({
                ...prevData,
                customerName: e.target.value,
              }))
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
