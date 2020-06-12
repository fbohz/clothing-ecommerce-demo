import React, { useContext } from 'react';

import styled from 'styled-components'

import { CartContext } from '../../providers/cart/cart.provider';


const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem
    const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);


    return (
        <CheckoutItemStyle>
            <div className='image-container'>
            <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>
                &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>
                &#10095;
                </div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={()=> clearItemFromCart(cartItem)}>&#10005;</div>
        </CheckoutItemStyle>
    )
}

export default CheckoutItem

const CheckoutItemStyle = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .image-container {
    width: 23%;
    padding-right: 15px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .name,
  .quantity,
  .price {
    width: 23%;
  }

  .quantity {
    display: flex;

    .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
  }

  .remove-button {
    padding-left: 12px;
    cursor: pointer;
  }
`