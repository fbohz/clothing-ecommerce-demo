import React from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ReactComponent as Logo } from '../../src/assets/ghibli.svg'
import { createStructuredSelector } from 'reselect'

import { auth } from '../firebase/firebase.utils'
import CartIcon from '../components/shop/CartIcon'
import CartDropdown from '../components/shop/CartDropdown'
import {selectCartHidden, selectCurrentUser} from '../utils/selectors'

const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderStyle>
            <a href="https://github.com/fbohz" className="logo-container" target="_blank" rel="noopener noreferrer">
                <Logo className="logo"/><br></br>
            <small><i>For fans, by a fan</i></small>
            </a>
            <div className="options">
                 <Link to="/shop" className="option" >SHOP</Link>
                 <Link to="/shop" className="option" >ABOUT</Link>
                 {
                   currentUser ? 
                   <div className="option" onClick={() => auth.signOut()}>LOGOUT</div> 
                   : 
                   <Link className="option" to="/signin">LOGIN</Link>
                 }
                 <CartIcon />
            </div>
                {
                  hidden ? null : <CartDropdown />
                }
        </HeaderStyle>
    )
}

const msp = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
})

export default connect(msp)(Header)

const HeaderStyle = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  .logo-container {
    height: 100%;
    width: 70px;
    padding: 25px;
  }
/* 
  .logo {
      width: 20%;
  } */

  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .option {
      padding: 10px 15px;
      cursor: pointer;
    }
  }
`