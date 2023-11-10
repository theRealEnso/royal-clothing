import {useState} from 'react';

import {useSelector, useDispatch} from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';
import { emptyCartItems } from '../../store/cart/cart-actions';

import { useNavigate } from 'react-router-dom';

import './payment-form.styles.scss';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, {BUTTON_TYPE_CLASSES} from "../button/Button";
// import ButtonSpinner from '../button-spinner/button-spinner';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const handlePayment = async (event) => {
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

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
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
                dispatch(emptyCartItems());
            };
        };
    };

    return (
        <div className='payment-form-container'>
            <form className='form-container' onSubmit={handlePayment}>
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>

                <div className='b-container'>
                    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay Now</Button>
                </div>
                
            </form>
        </div>
    );
};

export default PaymentForm;