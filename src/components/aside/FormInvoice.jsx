import React from 'react';
import AsideContainer from './AsideContainer';

export default function FormInvoice({ handleShowAside, isAsideOpen }) {
  return (
    <AsideContainer handleShowAside={handleShowAside} isAsideOpen={isAsideOpen}>
      <h1>Form Invoice</h1>
    </AsideContainer>
  );
}
