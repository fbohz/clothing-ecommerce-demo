import React from "react";
import styled from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeBtn = ({ price }) => {
    const priceForStripe = price * 100
    const publishableKey = "pk_test_51Gq0pQEICM9QBNJx1PNb75paJPOt77UAYIIneEEExKL238MHZwjH1lETI9dhUL3pTKLsIXFzQypaDp56ODvh6fwo00O9oE5EMr"
    
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
        .then(res => {
            alert('Payment Successful')
        })
        .catch(e => {
            console.log('Payment error', JSON.parse(e))
            alert('There was an issue with your payment. Please use the provided credit card.')
        })
    }

    return (
        <StripeBtnStyle>
            <StripeCheckout
                label="Pay Now"
                name="(DEMO_ONLY) Studio Ghibli's Fan Hub"
                billingAddress
                shippingAddress
                image="https://svgshare.com/i/Lko.svg"
                description={`Your (demo) total is $${price}`}
                amount={priceForStripe}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={publishableKey}
            >

            </StripeCheckout>
        </StripeBtnStyle>
    )
}

export default StripeBtn

const StripeBtnStyle = styled.div`

`