import {useContext} from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

import DeleteIcon from '@mui/icons-material/Delete';


const CheckoutItem = ({cartItem}) => {
    const {name, price, imageUrl, quantity} = cartItem;
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);

    const addOneToCart = () => addItemToCart(cartItem);
    const removeOneFromCart = () => removeItemFromCart(cartItem);
    const deleteFromCart = () => deleteItemFromCart(cartItem);

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