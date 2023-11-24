import {useDispatch, useSelector} from 'react-redux';
import { addItemToCart, removeItemFromCart, deleteItemFromCart } from '../../store/cart/cart-actions';
import { selectCartItems } from '../../store/cart/cart-selector';

import {CheckBoxIcon, AddIcon, DeleteIcon, CartItemContainer, ItemDetails, Name, QuantityPrice, IconContainer} from './cart-item.styles.jsx';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeProductFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const deleteProductFromCart = () => dispatch(deleteItemFromCart(cartItems, cartItem));

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}></img>

            <ItemDetails>
                <Name>{name}</Name>
                <QuantityPrice>{quantity} x ${price}</QuantityPrice>

                <IconContainer>
                    <CheckBoxIcon as='span' onClick={removeProductFromCart}></CheckBoxIcon>
                    <AddIcon as='span' onClick={addProductToCart}></AddIcon>
                    <DeleteIcon as='span' onClick={deleteProductFromCart}></DeleteIcon>
                </IconContainer>
                
            </ItemDetails>

        </CartItemContainer>
    );
};

export default CartItem;