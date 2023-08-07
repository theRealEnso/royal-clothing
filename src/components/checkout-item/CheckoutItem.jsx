import {useDispatch, useSelector} from 'react-redux';

import {addItemToCart, removeItemFromCart, deleteItemFromCart} from '../../store/cart/cart-actions';
import { selectCartItems } from '../../store/cart/cart-selector';

import './checkout-item.styles.scss';

import DeleteIcon from '@mui/icons-material/Delete';


const CheckoutItem = ({cartItem}) => {
    const {name, price, imageUrl, quantity} = cartItem;
    
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addOneToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeOneFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const deleteFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <div className='checkout-card-container'>
            <div className='checkout-image-container'>
                <img src={imageUrl} alt={`${name}`}></img>
            </div>

            <span className='checkout-item-name'>{name}</span>

            <div className='checkout-item-quantity'>
                <div className='arrow left' onClick={removeOneFromCart}>
                    &#10094;
                </div>

                <span className='value'>{quantity}</span>

                <div className='arrow right' onClick={addOneToCart}>
                    &#10095;
                </div>
            </div>

            <span className='price'>$ {price}</span>

            <span className='item-total'>$ {quantity * price}</span>

            <DeleteIcon className='deleteIcon' onClick={deleteFromCart}></DeleteIcon>

        </div>
    );
};

export default CheckoutItem;