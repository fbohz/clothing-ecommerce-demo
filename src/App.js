import React from 'react';
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Home from './pages/Home'
import ShopPage from  './pages/shop/Shop'
import Header from './components/Header'
import LoginLogout from './pages/users/LoginLogout'
import Checkout from './pages/shop/Checkout'

import {setCurrentUser} from './redux/actions/actions'
import {selectCurrentUser} from './utils/selectors'


import { auth, createUserProfileDocument } from './firebase/firebase.utils'


// 1. Uncomment and use for populating db ONLY. After use comment back.
import { addCollectionAndDocuments } from './firebase/firebase.utils'
//import {selectCollectionsForPreview} from './utils/selectors'
import {SHOP_DATA} from './lib/shop.data'

class App extends React.Component {

  unsubscribeFromAuth = null

  // 2. Uncomment and use for populating db only. UNCOMMENT other componentDidMount! After use comment back.
  componentDidMount() {
    const {collectionsArray } = this.props;
    addCollectionAndDocuments('collections', SHOP_DATA.map(
      ({title, items}) => ({title,items}) 
      ))
  }

  // componentDidMount() {
  //   const { setCurrentUser } = this.props;

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot(snapShot => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data()
  //         });
  //       });
  //     }

  //     setCurrentUser(userAuth);
  //   });
  // }

  // 3. Uncomment and use for populating db ONLY. After use comment back.
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // } 

  render() {
    return (
      <AppStyle>
        <Header />
  
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={Checkout}/>
          <Route exact path="/login" render={() => this.props.currentUser ?  <Redirect to="/" /> : <LoginLogout />
          } />
        </Switch>
      </AppStyle>
    );
  }
}

const msp = createStructuredSelector({
  currentUser: selectCurrentUser,
  // 3. Uncomment and use for populating db only. After use comment back.
  // collectionsArray: selectCollectionsForPreview,

})

const mdp = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
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