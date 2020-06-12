import React from "react";
import styled from 'styled-components'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectCartItems, selectCartTotal} from '../../utils/selectors'
import CheckoutItem from '../../components/shop/CheckoutItem'
import StripeBtn from '../../stripe/StripeBtn'

const Checkout = ({ cartItems, total }) => (
    <CheckoutStyle>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: ${total}</div>
      <div className='test-warning'>
        *Please use the following TEST Credit Card for payments*
        <br />
        4242424242424242 | Exp 12/2050 | CVC 123
      </div>
      <StripeBtn price={total} />
    </CheckoutStyle>
  );

const msp = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
})  
  
export default connect(msp)(Checkout)

const CheckoutStyle = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;

  .checkout-header {
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;

    .header-block {
      text-transform: capitalize;
      width: 23%;

      &:last-child {
        width: 8%;
      }
    }
  }

  .total {
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
  }

  button {
    margin-left: auto;
    margin-top: 50px;
  }

  .test-warning {
    text-align: center;
    margin-top: 40px;
    font-size: 24px;
    color: red;
  }
`