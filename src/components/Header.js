import React from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ReactComponent as Logo } from '../../src/assets/ghibli.svg'

import { auth } from '../firebase/firebase.utils'
import CartIcon from '../components/shop/CartIcon'
import CartDropdown from '../components/shop/CartDropdown'

const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderStyle>
            <Link to="/" className="logo-container">
                <Logo className="logo"/>
            </Link>
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

const msp = ({user: {currentUser}, cart: {hidden}}) => ({
  currentUser,
  hidden,
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