import React from 'react';
import styled from 'styled-components'
import Home from './pages/Home'

function App() {
  return (
    <AppStyle>
      <Home>
      </Home>
    </AppStyle>
  );
}

export default App;


const AppStyle = styled.div`
  font-family: 'Open Sans Condensed'
`