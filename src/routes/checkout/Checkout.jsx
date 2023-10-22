// import { useContext } from 'react';

import {useSelector} from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart-selector';

// import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import PaymentForm from '../../components/payment-form/payment-form';

import './checkout.styles.scss';

const Checkout = () => {
    // const {cartItems, total} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <div className='checkout-container'>

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
                    <span>Price/Item</span>
                </div>

                <div className='header-block'>
                    <span>Item Total</span>
                </div>

                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>

            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>)
            }

            <span className='total'>Total : $ {cartTotal}</span>
            
            <PaymentForm></PaymentForm>

        </div>
    );
};

export default Checkout;