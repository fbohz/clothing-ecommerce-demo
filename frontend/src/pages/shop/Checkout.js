import React from "react";
import styled from 'styled-components'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCartItems, selectCartTotal} from '../../utils/selectors'
import CheckoutItem from '../../components/shop/CheckoutItem'
import StripeBtn from '../../stripe/StripeBtn'

const Checkout = ({ cartItems, total }) => (
    <CheckoutPageContainer><br></br>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${total}</TotalContainer>
      <WarningContainer>
        *Please use the following TEST Credit Card for payments*
        <br />
        4242424242424242 | Exp 12/2050 | CVC 123
      </WarningContainer>
      <StripeBtn price={total} />
    </CheckoutPageContainer>
  );

const msp = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
})  
  
export default connect(msp)(Checkout)

const CheckoutPageContainer = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  button {
    margin-left: auto;
    margin-top: 50px;
  }
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

const CheckoutHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

const HeaderBlockContainer = styled.div`
  text-transform: capitalize;
  width: 23%;
  &:last-child {
    width: 8%;
  }
  @media screen and (max-width: 800px) {
    width: 22%;
    &:last-child {
      width: 12%;
    }
  }
`;

const TotalContainer = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

const WarningContainer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 24px;
  color: red;
`;