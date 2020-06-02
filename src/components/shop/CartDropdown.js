import React from "react";
import styled from 'styled-components'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import CustomButton from '../CustomButton'
import CartItem from './CartItem'
import {selectCartItems} from '../../utils/selectors'
import {toggleCartHidden} from '../../redux/actions/actions'

const CartDropdown = ({cartItems, history, dispatch}) => {
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
            history.push('/checkout')
            dispatch(toggleCartHidden())
          }}>
            GO TO CHECKOUT
        </CartDropdownButton>
        </CartDropdownContainer>
    )
}

const msp = (state) => ({
    cartItems: selectCartItems(state),
})

export default withRouter(connect(msp)(CartDropdown))

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
