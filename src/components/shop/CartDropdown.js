import React from "react";
import styled from 'styled-components'
import {connect} from 'react-redux'

import CustomButton from '../CustomButton'
import CartItem from './CartItem'
import {selectCartItems} from '../../utils/selectors'


const CartDropdown = ({cartItems}) => {
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
        <CartDropdownButton>GO TO CHECKOUT</CartDropdownButton>
        </CartDropdownContainer>
    )
}

const msp = ({cart: { cartItems } }) => ({
    cartItems,
})

export default connect(msp)(CartDropdown)

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
