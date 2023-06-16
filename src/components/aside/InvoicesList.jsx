/* eslint-disable react/prop-types */
import React from 'react';
import AsideContainer from './AsideContainer';
import { FaTrash } from 'react-icons/fa';
export default function InvoiceList({
  handleShowAside,
  isAsideOpen,
  invoiceList,
  handleDeleteInvoice,
}) {
  //Total de factura
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.total, 0);
  };

  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>InvoiceList</h1>
      <div className="invoice-list">
        {invoiceList.length > 0 ? (
          invoiceList
            .sort((a, b) => b.invoiceNumber - a.invoiceNumber)
            .map((invoice) => (
              <div className="invoice-card" key={invoice.invoiceNumber}>
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
            ))
        ) : (
          <p className="empty-container">No invoices yet</p>
        )}
      </div>
    </AsideContainer>
  );
}
