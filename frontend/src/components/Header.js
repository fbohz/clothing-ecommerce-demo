import React from "react";
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {ReactComponent as Logo } from '../assets/ghibli.svg'
import { createStructuredSelector } from 'reselect'

import CartIcon from './shop/CartIcon'
import CartDropdown from './shop/CartDropdown'
import {selectCartHidden, selectCurrentUser} from '../utils/selectors'

import {signOutStart} from '../redux/actions/actions'

const Header = ({ currentUser, hidden, signOutStart }) => (
  <HeaderContainer>
    <a href="https://github.com/fbohz" className="logo-container" target="_blank" rel="noopener noreferrer">
      <Logo className='logo' />
      <b>FOR FANS BY A FAN</b>
      </a>
    <OptionsContainer>
      <OptionLink to='/'>HOME</OptionLink>
      <OptionLink to='/shop'>SHOP</OptionLink>
      <OptionLink to="/news">NEWS</OptionLink>

      {currentUser ? (
        <OptionLink as='div' onClick={signOutStart}>
          LOGOUT
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

const mdp = dispatch => ({
  signOutStart: () =>  dispatch(signOutStart())
})

export default connect(msp,mdp)(Header)

const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }

.logo-container {
  height: 100%;
  width: 100px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 0;
  }
  }
`;

const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`;

const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;