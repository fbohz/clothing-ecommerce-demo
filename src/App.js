import React from 'react';
import styled from 'styled-components'
import Home from './pages/Home'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <AppStyle>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </AppStyle>
  );
}

export default App;


const AppStyle = styled.div`
  font-family: 'Open Sans Condensed'
`