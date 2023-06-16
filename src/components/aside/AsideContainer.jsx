/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';

const AsideContainer = ({ handleShowAside, isAsideOpen, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  //condicionar el boton de regresar a las rutas especificas
  const shouldShowBackButton =
    location.pathname.includes('/menu/form') ||
    location.pathname.includes('/menu/list');

  //Función para volver a la ruta anterior
  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <aside className={`aside-menu ${isAsideOpen ? 'open' : 'hide'}`}>
      <section className="aside-menu__button">
        {shouldShowBackButton && (
          <IoMdArrowBack className="backButton" onClick={handleBackButton} />
        )}

        <button className="close-button" onClick={handleShowAside}>
          X
        </button>
      </section>
      {children}
    </aside>
  );
};

export default AsideContainer;
