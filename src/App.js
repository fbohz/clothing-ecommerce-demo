import React from 'react';
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import ShopPage from  './pages/shop/Shop'

function App() {
  return (
    <AppStyle>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/shop" component={ShopPage}/>
      </Switch>
    </AppStyle>
  );
}

export default App;


const AppStyle = styled.div`
  font-family: 'Open Sans Condensed';
  padding: 20px 60px
`