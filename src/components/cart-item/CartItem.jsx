import {useContext} from 'react';

import './cart-item.styles.scss';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { CartContext } from '../../contexts/cart.context';

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(cartItem);
    const removeProductFromCart = () => removeItemFromCart(cartItem);
    const deleteProductFromCart = () => deleteItemFromCart(cartItem);

    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}></img>

            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='quantityPrice'>{quantity} x ${price}</span>

                <div className='icon-container'>
                    <span className='minusIcon' onClick={removeProductFromCart}><IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon></span>
                    <span className='addIcon' onClick={addProductToCart}><AddBoxIcon></AddBoxIcon></span>
                    <span className='trashIcon' onClick={deleteProductFromCart}><DeleteForeverIcon></DeleteForeverIcon></span>
                </div>
                
            </div>

        </div>
    );
};

export default CartItem;