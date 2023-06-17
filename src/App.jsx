import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import FormInvoice from './components/aside/FormInvoice';
import InvoiceList from './components/aside/InvoicesList';
import ItemListContainer from './components/items/itemListContainer';
import Menu from './components/menu/Menu';
import MenuAside from './components/aside/MenuAside';
import { Toast, handleToast } from './components/utils/toast';
import { toast } from 'react-toastify';

const App = () => {
  // Estados
  const [isAsideOpen, setAsideOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  //Inicia el state desde el localStorage si existe, sino lo inicia vacío
  const [invoiceList, setInvoiceList] = useState(() => {
    const savedInvoiceList = localStorage.getItem('invoiceList');
    return savedInvoiceList ? JSON.parse(savedInvoiceList) : [];
  });
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(0);

  const generateInvoiceNumber = () => {
    const nextInvoiceNumber = lastInvoiceNumber + 1;
    setLastInvoiceNumber(nextInvoiceNumber);
    localStorage.setItem('lastInvoiceNumber', nextInvoiceNumber.toString());
    return nextInvoiceNumber;
  };
  //Inicia el state desde el localStorage si existe, sino lo inicia con un objeto con valores por defecto
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

  // Funciones auxiliares
  //Obtener un número de factura único al recargar la app o al crear una nueva factura

  //Borrar facturas de UI y localStorage
  const handleDeleteInvoice = (invoiceNumber) => {
    const updatedInvoiceList = invoiceList.filter(
      (invoice) => invoice.invoiceNumber !== invoiceNumber
    );
    setInvoiceList(updatedInvoiceList);
    localStorage.setItem('invoiceList', JSON.stringify(updatedInvoiceList));
  };

  //Show-Hide del aside
  const handleShowAside = () => {
    setAsideOpen(!isAsideOpen);
  };

  //Agregar producto al listado
  const handleAddToProductList = (product) => {
    const existingProduct = invoiceData.items.findIndex(
      (item) => item.id === product.id
    );

    if (existingProduct !== -1) {
      toast.warn('This product is already in the invoice');
    } else {
      const newProduct = {
        ...product,
        quantity: 1,
        total: product.price,
      };
      //copia del estado anterior y modifico items
      setInvoiceData({
        ...invoiceData,
        items: [...invoiceData.items, newProduct],
      });
    }
  };
  // Cancelar la creación de una nueva factura y devuelvo el último número de factura vigente
  const handleCancel = () => {
    setInvoiceData({
      invoiceNumber: lastInvoiceNumber,
      customerName: '',
      date: new Date().toLocaleDateString(),
      items: [],
    });
  };
  // OnSubmit del formulario de nueva factura
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validaciones de formulario
    if (invoiceData.customerName === '') {
      handleToast('warn', 'The name of the customer is required');
      return;
    }
    if (invoiceData.items.length === 0) {
      handleToast('warn', 'You must add at least one product');
      return;
    }

    // Crear una nueva factura
    setInvoiceList([...invoiceList, invoiceData]);
    handleToast('success', 'Invoice created successfully');

    //almacenar la factura en el localStorage
    localStorage.removeItem('invoice');

    // Restablecer el estado y los campos del formulario
    setInvoiceData({
      invoiceNumber: generateInvoiceNumber(),
      customerName: '',
      date: new Date().toLocaleDateString(),
      items: [],
    });
  };

  // Efectos
  //Al cargar la app, si hay productos en el localStorage los cargo en el estado
  useEffect(() => {
    const savedProductList = localStorage.getItem('productList');
    if (savedProductList) {
      setProductList(JSON.parse(savedProductList));
    }
  }, []);

  //Se guardan los datos en localStorage cada vez que modifico datos de la factura
  useEffect(() => {
    localStorage.setItem('invoice', JSON.stringify(invoiceData));
  }, [invoiceData]);

  //Se guardan los productos en localStorage cada vez que modifico el listado de facturas
  useEffect(() => {
    localStorage.setItem('invoiceList', JSON.stringify(invoiceList));
  }, [invoiceList]);

  //
  useEffect(() => {
    //chequeo que hayan datos almacenados en el localStorage
    const savedInvoiceList = localStorage.getItem('invoiceList');
    const savedLastInvoiceNumber = localStorage.getItem('lastInvoiceNumber');

    //si hay datos de facturas guardadas actualizo el listado de facturas y el último número de factura
    if (savedInvoiceList) {
      setInvoiceList(JSON.parse(savedInvoiceList));

      if (JSON.parse(savedInvoiceList).length > 0) {
        const lastInvoice =
          JSON.parse(savedInvoiceList)[JSON.parse(savedInvoiceList).length - 1];
        setLastInvoiceNumber(lastInvoice.invoiceNumber);
      }
    }
    //si hay datos del último número de factura guardado actualizo el estado
    if (savedLastInvoiceNumber) {
      setLastInvoiceNumber(Number(savedLastInvoiceNumber));
    }
  }, []);

  // Renderizado
  return (
    <>
      <Menu handleShowAside={handleShowAside} isAsideOpen={isAsideOpen} />
      <ItemListContainer
        productList={productList}
        handleAddToProductList={handleAddToProductList}
      />
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
              invoiceData={invoiceData}
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
            />
          }
        />
        <Route
          path="*"
          element={
            <ItemListContainer
              productList={productList}
              handleAddToProductList={handleAddToProductList}
            />
          }
        />
      </Routes>

      <Toast />
    </>
  );
};

export default App;
