import {useContext} from 'react';
import { CartContext } from '../../contexts/cart.context';

import {useNavigate} from 'react-router-dom';

import CartItem from '../cart-item/CartItem';
import Button from '../button/Button';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const {cartItems, total} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutPage = () => navigate('/checkout')
    

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>)
                }

                {
                    cartItems.length === 0 ? <span className='empty-message'>Your shopping cart is currently empty</span> : <span className='sub-total'>Sub-total: $ {total}</span>
                }
            
                <Button onClick={goToCheckoutPage}>Go to Checkout</Button>
            </div>
            
        </div>
    );
};

export default CartDropdown;