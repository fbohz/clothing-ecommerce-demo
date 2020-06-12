import React from 'react';
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import ShopPage from  './pages/shop/Shop'
import Header from './components/Header'
import LoginLogout from './pages/users/LoginLogout'
import Checkout from './pages/shop/Checkout'


import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  } 

  render() {
    return (
      <AppStyle>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
  
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={Checkout}/>
          <Route exact path="/login" render={() => this.state.currentUser ?  <Redirect to="/" /> : <LoginLogout />
          } />
        </Switch>
      </AppStyle>
    );
  }
}

export default App;


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