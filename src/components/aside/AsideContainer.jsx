import React from 'react';

const AsideContainer = ({ handleShowAside, isAsideOpen, children }) => {
  return (
    <aside className={`aside-menu ${isAsideOpen ? 'open' : 'hide'}`}>
      <button className="close-button" onClick={handleShowAside}>
        X
      </button>
      {children}
    </aside>
  );
};

export default AsideContainer;
