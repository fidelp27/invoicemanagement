import React from 'react';
import AsideContainer from './AsideContainer';

export default function InvoiceList({ handleShowAside, isAsideOpen }) {
  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>InvoiceList</h1>
    </AsideContainer>
  );
}
