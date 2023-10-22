import './payment-form.styles.scss';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, {BUTTON_TYPE_CLASSES} from "../button/Button";

const PaymentForm = () => {
    const handlePayment = async (event) => {
        event.preventDefault();
        const stripe = useStripe();
        const elements = useElements();

        if(!stripe || ! elements) return;


    };

    return (
        <div className='payment-form-container'>
            <div className='form-container'>
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </div>
        </div>
    );
};

export default PaymentForm;