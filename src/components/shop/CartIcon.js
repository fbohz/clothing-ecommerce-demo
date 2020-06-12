import React, {useContext} from "react";
import styled from 'styled-components'

import { ReactComponent as ShoppingIcon } from '../../assets/cart.svg'

import { CartContext } from '../../providers/cart/cart.provider';

const CartIcon = ({ itemCount }) => {
  const { toggleHidden, cartItemsCount } = useContext(CartContext);

  return (
    <CartContainer onClick={toggleHidden}>
      <ShoppingIconStyles />
      <ItemCountContainer>{cartItemsCount}</ItemCountContainer>
    </CartContainer>
  )
}
  
export default CartIcon

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