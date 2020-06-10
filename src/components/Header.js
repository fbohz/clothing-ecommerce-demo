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

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='https://github.com/fbohz'>
      <Logo className='logo' />
      <b>FOR FANS BY A FAN</b>
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/'>HOME</OptionLink>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to="/news">NEWS</OptionLink>

      {currentUser ? (
        <OptionLink as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to='/login'>LOGIN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const msp = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
})

export default connect(msp)(Header)

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 100px;
  padding: 25px;
`;

const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;