import React from 'react';
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Header from './components/Header'
import Home from './pages/Home'
import ShopPage from  './pages/shop/Shop'
import LoginLogout from './pages/users/LoginLogout'
import Checkout from './pages/shop/Checkout'
import Characters from './pages/characters_news/Characters'
import News from './pages/characters_news/News'

import {selectCurrentUser} from './utils/selectors'
import {checkUserSession} from './redux/actions/actions'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {checkUserSession} = this.props
    checkUserSession()
}

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  } 

  render() {
    return (
      <AppStyle>
        <Header />
  
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={Checkout}/>
          <Route exact path="/characters" component={Characters}/>
          <Route exact path="/news" component={News}/>
          <Route exact path="/login" render={() => this.props.currentUser ?  <Redirect to="/" /> : <LoginLogout />
          } />
        </Switch>
      </AppStyle>
    );
  }
}

const mdp = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

const msp = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(msp, mdp)(App);


const AppStyle = styled.div`
  font-family: 'Open Sans Condensed';
  padding: 20px 60px;
  a {
    text-decoration: none;
    color: black;
  }
  
  /* * {
    box-sizing: border-box;
  } */
`