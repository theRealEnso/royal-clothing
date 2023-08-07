import {useDispatch, useSelector} from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart-actions';
import { selectCartItems } from '../../store/cart/cart-selector';

import './cart-item.styles.scss';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeProductFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const deleteProductFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));

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