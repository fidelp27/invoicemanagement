import React, { useState } from 'react';
import ItemListContainer from './components/itemListContainer/itemListContainer';
import Menu from './components/menu/Menu';
import MenuAside from './components/aside/Menuaside';
import { Routes, Route } from 'react-router-dom';
import FormInvoice from './components/aside/FormInvoice';
import InvoiceList from './components/aside/InvoicesList';
const App = () => {
  const [isAsideOpen, setAsideOpen] = useState(false);
  const handleShowAside = () => {
    setAsideOpen(!isAsideOpen);
  };
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
            />
          }
        />
        <Route
          path="/menu/list"
          element={
            <InvoiceList
              handleShowAside={handleShowAside}
              isAsideOpen={isAsideOpen}
            />
          }
        />
      </Routes>
      <ItemListContainer />
    </>
  );
};

export default App;
