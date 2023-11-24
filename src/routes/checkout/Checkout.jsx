// import { useContext } from 'react';

import {useSelector} from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart-selector';

// import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import PaymentForm from '../../components/payment-form/payment-form';

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from  './checkout.styles.jsx';

const Checkout = () => {
    // const {cartItems, total} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>

            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Price/Item</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Item Total</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>)
            }

            <Total>Total : $ {cartTotal}</Total>
            
            <PaymentForm></PaymentForm>

        </CheckoutContainer>
    );
};

export default Checkout;