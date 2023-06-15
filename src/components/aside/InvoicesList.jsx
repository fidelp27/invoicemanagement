import React from 'react';
import AsideContainer from './AsideContainer';
import { FaTrash } from 'react-icons/fa';
export default function InvoiceList({
  handleShowAside,
  isAsideOpen,
  invoiceList,
  handleDeleteInvoice,
}) {
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>InvoiceList</h1>
      {invoiceList.length > 0 ? (
        <div className="invoice-list">
          {invoiceList
            .sort((a, b) => b.invoiceNumber - a.invoiceNumber)
            .map((invoice) => (
              <div className="invoice-card" key={invoice.id}>
                <div className="invoice-card-item">
                  <strong>Invoice Number:</strong> {invoice.invoiceNumber}
                </div>
                <div className="invoice-card-item">
                  <strong>Customer Name:</strong> {invoice.customerName}
                </div>
                <div className="invoice-card-item">
                  <strong>Date:</strong> {invoice.date}
                </div>
                <div className="invoice-card-item">
                  <strong>Total:</strong>${calculateTotal(invoice.items)}
                </div>
                <div
                  className="delete-icon"
                  onClick={() => handleDeleteInvoice(invoice.invoiceNumber)}
                >
                  <FaTrash />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No invoices yet</p>
      )}
    </AsideContainer>
  );
}
