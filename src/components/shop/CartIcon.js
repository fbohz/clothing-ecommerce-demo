import React from "react";
import styled from 'styled-components'

import { ReactComponent as ShoppingIcon } from '../../assets/cart.svg'
import {connect} from 'react-redux'
import {toggleCartHidden} from '../../redux/actions/actions'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartContainer onClick={toggleCartHidden}>
      <ShoppingIconStyles />
      <ItemCountContainer>{itemCount}</ItemCountContainer>
    </CartContainer>
  );

const mdp = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})
  
export default connect(null, mdp)(CartIcon)

const CartContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShoppingIconStyles = styled(ShoppingIcon)`
  width: 24px;
  height: 24px;
`;

const ItemCountContainer = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;