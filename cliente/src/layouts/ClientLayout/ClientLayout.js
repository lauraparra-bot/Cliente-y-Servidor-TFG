import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopBar, Footer } from '../../components/Web';
import "./ClientLayout.scss"

export function ClientLayout(props) {
  const { children } = props;
  return (
    <div className='client-layout'>
      <div className='client-layout__header'>
        <TopBar />
      </div>

      {children}

      <div className='client-layout__footer'>
        <Container>
          <Footer.Info />
          <Footer.Menu />
          <span>INFO</span>
          <span>MENU</span>
        </Container>
        <Container>
          <span>© ALL RIGHTS RESERVED</span>
          <span>LAURA PARRA NAVARRO | DEVELOPER</span>
        </Container>
      </div>


    </div>
  );
}
