import {useState} from 'react';

import { FormEvent } from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';
import { emptyCartItems } from '../../store/cart/cart-actions';

import { useNavigate } from 'react-router-dom';

import {PaymentFormContainer, FormContainer, PaymentButton} from './payment-form.styles';
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js';

import {BUTTON_TYPE_CLASSES} from "../button/Button";

//function expects a card as an input. Card is either of type StripeCardElement or null.
//function type narrowing returns the card as a StripeCardElement if card is not equal to null
const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const handlePayment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!stripe || !elements){
            return;
        };

        setIsProcessingPayment(true);

        //netlify works with functions as if they were API endpoints => pass the route relative to application URL / root.
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(response => response.json());

        console.log(response);

        // const clientSecret = response.paymentIntent.client_secret;
        const {paymentIntent: {client_secret}} = response; // destructure from the response object, first the paymentIntent object, and then the client_secret nested under the paymentIntent object

        const cardDetails = elements.getElement(CardElement);
        if (!ifValidCardElement(cardDetails)) return; // if cardDetails passed in as card is null, then return

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails, // elements.getElement(CardElement) could return NULL, but typescript doesn't like this
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
                navigate('/confirmation');
                dispatch(emptyCartItems([]));
            };
        };
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={handlePayment}>
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>

                <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay Now</PaymentButton>
                
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;