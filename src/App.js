import React from 'react';
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import ShopPage from  './pages/shop/Shop'
import Header from './components/Header'
import LoginLogout from './pages/users/LoginLogout'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  state = {
    currentUser: null,
  }

  unsubscribeFromAuth = null

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

          //console.log(this.state);
        });
      }
      //// if userAuth is null do this:
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth()
  } 

  render() {
    return (
      <AppStyle>
        <Header currentUser={this.state.currentUser} />
  
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={LoginLogout}/>
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