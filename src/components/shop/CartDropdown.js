import React, {useContext} from "react";
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import CustomButton from '../CustomButton'
import CartItem from './CartItem'
import { CartContext } from '../../providers/cart/cart.provider';


const CartDropdown = ({history}) => {
  const { cartItems, toggleHidden } = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
            {cartItems.length ? (
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item={cartItem} />
                ))
            ) : (
                <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
            )}
            </CartItemsContainer>
        <CartDropdownButton 
            onClick={() => {
              history.push('/checkout');
              toggleHidden();
            }}
          >
            GO TO CHECKOUT
        </CartDropdownButton>
        </CartDropdownContainer>
    )
}

export default withRouter(CartDropdown)

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

const CartDropdownButton = styled(CustomButton)`
  margin-top: auto;
`;

const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
