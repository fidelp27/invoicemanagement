import React, { useState, useEffect } from 'react';
import ItemListContainer from './components/itemListContainer/itemListContainer';
import Menu from './components/menu/Menu';
import MenuAside from './components/aside/MenuAside';
import { Routes, Route } from 'react-router-dom';
import FormInvoice from './components/aside/FormInvoice';
import InvoiceList from './components/aside/InvoicesList';
import { toast } from 'react-toastify';
import Toast from './components/utils/toast';
import { useNavigate } from 'react-router-dom';
const App = () => {
  const [isAsideOpen, setAsideOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceList, setInvoiceList] = useState(() => {
    const savedInvoiceList = localStorage.getItem('invoiceList');
    return savedInvoiceList ? JSON.parse(savedInvoiceList) : [];
  });
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(0);
  const navigate = useNavigate();
  const handleToast = (type, text) => {
    toast[type](text, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  };

  const generateInvoiceNumber = () => {
    const nextInvoiceNumber = lastInvoiceNumber + 1;
    setLastInvoiceNumber(nextInvoiceNumber);
    localStorage.setItem('lastInvoiceNumber', nextInvoiceNumber.toString());
    return nextInvoiceNumber;
  };
  const handleEditInvoice = (invoiceNumber) => {
    const invoiceToEdit = invoiceList.find(
      (invoice) => invoice.invoiceNumber === invoiceNumber
    );
    setSelectedInvoice(invoiceToEdit);
  };
  const [invoiceData, setInvoiceData] = useState(() => {
    const savedInvoice = localStorage.getItem('invoice');
    if (savedInvoice) {
      return JSON.parse(savedInvoice);
    } else {
      return {
        invoiceNumber: generateInvoiceNumber(),
        customerName: '',
        date: new Date().toLocaleDateString(),
        items: productList,
      };
    }
  });

  const handleDeleteInvoice = (invoiceNumber) => {
    const updatedInvoiceList = invoiceList.filter(
      (invoice) => invoice.invoiceNumber !== invoiceNumber
    );
    setInvoiceList(updatedInvoiceList);
    localStorage.setItem('invoiceList', JSON.stringify(updatedInvoiceList));
  };

  const handleShowAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  const handleAddToProductList = (product) => {
    const existingProductIndex = invoiceData.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedItems = [...invoiceData.items];
      updatedItems[existingProductIndex].quantity += 1;
      updatedItems[existingProductIndex].total =
        updatedItems[existingProductIndex].quantity * product.price;

      setInvoiceData((prevData) => ({
        ...prevData,
        items: updatedItems,
      }));
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
        total: product.price,
      };

      setInvoiceData((prevData) => ({
        ...prevData,
        items: [...prevData.items, newProduct],
      }));
    }
  };
  const handleCancel = () => {
    setInvoiceData({
      invoiceNumber: lastInvoiceNumber,
      customerName: '',
      date: new Date().toLocaleDateString(),
      items: [],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (invoiceData.customerName === '') {
      handleToast('warn', 'The name of the customer is required');
      return;
    }
    if (invoiceData.items.length === 0) {
      handleToast('warn', 'You must add at least one product');
      return;
    }

    if (selectedInvoice) {
      // Editar la factura existente
      setInvoiceList((prevList) =>
        prevList.map((invoice) =>
          invoice.invoiceNumber === selectedInvoice.invoiceNumber
            ? invoiceData
            : invoice
        )
      );
      handleToast('success', 'Invoice updated successfully');
    } else {
      // Crear una nueva factura
      setInvoiceList((prevList) => [...prevList, invoiceData]);
      handleToast('success', 'Invoice created successfully');
    }

    // Restablecer el estado y los campos del formulario
    setSelectedInvoice(null);
    localStorage.removeItem('invoice');
    setInvoiceData({
      invoiceNumber: generateInvoiceNumber(),
      customerName: '',
      date: new Date().toLocaleDateString(),
      items: [],
    });
  };

  useEffect(() => {
    const savedProductList = localStorage.getItem('productList');
    if (savedProductList) {
      setProductList(JSON.parse(savedProductList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('invoice', JSON.stringify(invoiceData));
  }, [invoiceData]);

  useEffect(() => {
    localStorage.setItem('invoiceList', JSON.stringify(invoiceList));
  }, [invoiceList]);

  useEffect(() => {
    const savedInvoiceList = localStorage.getItem('invoiceList');
    const savedLastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');

    if (savedInvoiceList) {
      setInvoiceList(JSON.parse(savedInvoiceList));

      if (JSON.parse(savedInvoiceList).length > 0) {
        const lastInvoice =
          JSON.parse(savedInvoiceList)[JSON.parse(savedInvoiceList).length - 1];
        setLastInvoiceNumber(lastInvoice.invoiceNumber);
      }
    }

    if (savedLastInvoiceNumber) {
      setLastInvoiceNumber(Number(savedLastInvoiceNumber));
    }
  }, []);

  return (
    <>
      <Menu handleShowAside={handleShowAside} isAsideOpen={isAsideOpen} />
      <Routes>
        <Route
          path="/menu"
          element={
            <MenuAside
              handleShowAside={handleShowAside}
              isAsideOpen={isAsideOpen}
            />
          }
        />
        <Route
          path="/menu/form"
          element={
            <FormInvoice
              handleShowAside={handleShowAside}
              isAsideOpen={isAsideOpen}
              productList={productList}
              invoiceData={selectedInvoice || invoiceData}
              setInvoiceData={setInvoiceData}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          }
        />
        <Route
          path="/menu/list"
          element={
            <InvoiceList
              handleShowAside={handleShowAside}
              isAsideOpen={isAsideOpen}
              invoiceList={invoiceList}
              handleDeleteInvoice={handleDeleteInvoice}
              handleEditInvoice={handleEditInvoice}
            />
          }
        />
      </Routes>
      <ItemListContainer
        productList={productList}
        handleAddToProductList={handleAddToProductList}
      />
      <Toast />
    </>
  );
};

export default App;
