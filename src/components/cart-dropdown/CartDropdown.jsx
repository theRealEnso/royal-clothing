import {useSelector, useDispatch} from 'react-redux';

import { selectCartItems, selectCartTotal} from '../../store/cart/cart-selector';
import { setIsCartOpen } from '../../store/cart/cart-actions';

import {useNavigate} from 'react-router-dom';

import CartItem from '../cart-item/CartItem';
import Button from '../button/Button';

import {CartDropdownContainer, CartItemsContainer, EmptyMessage, Subtotal} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal)

    const goToCheckoutPage = () => {
        navigate('/checkout');
        dispatch(setIsCartOpen(false));
    };
    

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>)
                }

                {
                    cartItems.length === 0 ? <EmptyMessage>Your shopping cart is currently empty</EmptyMessage> : <Subtotal>Sub-total: $ {cartTotal}</Subtotal>
                }
            
                <Button onClick={goToCheckoutPage}>Go to Checkout</Button>
            </CartItemsContainer>
            
        </CartDropdownContainer>
    );
};

export default CartDropdown;