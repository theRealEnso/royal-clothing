import {useSelector, useDispatch} from 'react-redux';

import { selectCartItems, selectCartTotal} from '../../store/cart/cart-selector';
import { setIsCartOpen } from '../../store/cart/cart-actions';

import {useNavigate} from 'react-router-dom';

import CartItem from '../cart-item/CartItem';
import Button from '../button/Button';

import './cart-dropdown.styles.scss';

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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>)
                }

                {
                    cartItems.length === 0 ? <span className='empty-message'>Your shopping cart is currently empty</span> : <span className='sub-total'>Sub-total: $ {cartTotal}</span>
                }
            
                <Button onClick={goToCheckoutPage}>Go to Checkout</Button>
            </div>
            
        </div>
    );
};

export default CartDropdown;