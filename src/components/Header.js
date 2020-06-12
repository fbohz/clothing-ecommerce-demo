import React, {useContext} from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {ReactComponent as Logo } from '../../src/assets/ghibli.svg'

import { auth } from '../firebase/firebase.utils'
import CartIcon from '../components/shop/CartIcon'
import CartDropdown from '../components/shop/CartDropdown'

import CurrentUserContext from '../contexts/current-user/current-user.context';
import { CartContext } from '../providers/cart/cart.provider';


const Header = () => {
    const currentUser = useContext(CurrentUserContext);
    const { hidden } = useContext(CartContext);

    return (
        <HeaderStyle>
            <a href="https://github.com/fbohz" className="logo-container" target="_blank" rel="noopener noreferrer">
                <Logo className="logo"/>
            <small><b>FOR FANS BY A FAN</b></small>
            </a>
            <div className="options">
                <Link to="/" className="option" >HOME</Link>
                 <Link to="/shop" className="option" >SHOP</Link>
                 <Link to="/info/news" className="option" >NEWS</Link>
                 {
                   currentUser ? 
                   <div className="option" onClick={() => auth.signOut()}>LOGOUT</div> 
                   : 
                   <Link className="option" to="/login"> LOGIN</Link>
                 }
                 <CartIcon />
            </div>
                {
                  hidden ? null : <CartDropdown />
                }
        </HeaderStyle>
    )
}

export default Header

const HeaderStyle = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  .logo-container {
    height: 100%;
    width: 85px;
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